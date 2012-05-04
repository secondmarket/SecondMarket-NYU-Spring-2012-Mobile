#!/usr/bin/python

import socket
import cherrypy
import json
import math
import re

from pymongo import Connection

class CompanyMain:
    connection = Connection()
    db = connection['secondmarket']
    
    '''
    @cherrypy.expose
    def index(self):
        raise cherrypy.HTTPRedirect('/searchCompanyByName')
    '''
    
    @cherrypy.expose
    def getFusionChartJSON(self, *args, **kwargs):
        callback = kwargs.get('callback', '')
        
        companyCollection = self.db.company
        cursor = companyCollection.find({}, {"companyName":"1", "fundingAmount":"1", '_id':0}).sort("fundingAmount", -1).limit(10)
        dataList = []
        for row in cursor:
            #companyDict = {"label" : row["companyName"], "value" : row["fundingAmount"], "link" : "j-clickAndSearchCompanyByName-" + row["companyName"]}
            companyDict = {"label" : row["companyName"], "value" : row["fundingAmount"], "link" : "profile.html?companyName=" + row["companyName"]}
            dataList.append(companyDict)
        
        chartDict = {
        "xAxisName" : " ",
        "yAxisName" : " ",
        "numberPrefix" : "$",
        "bgColor":"4a5c64",
        "canvasBgAlpha":"0",
        "bgAlpha":"0,0",
        "showBorder" : "0",
        "palettecolors":"175a8a, b2d234, f9a01b, 00a38a, fcd41e, ff0000, 8946a8,828282,a7f1ed,eb0c8a",
        "outcnvbasefont":"Verdana",
        "outcnvbasefontsize":"10",
        "outcnvbasefontcolor":"000000",
        "canvasBorderThickness" :"0",
        "showYAxisValues":"0",
        "showAlternateVGridColor":"0",
        "showPlotBorder":"1",
        "DivLineThickness": "0",
        "plotFillAlpha":"100,100",
        "useroundedges":"1"
        }
        
    
               
        #body = {"plotdata" : {"chart" : chartDict, "data" : dataList}}
        jsonResponse = json.dumps({"chart" : chartDict, "data" : dataList})
    
        cherrypy.response.headers["Content-Type"] = "application/json"
        
        if callback:
            return callback + '(' + jsonResponse + ')'
        return jsonResponse
    
    
    @cherrypy.expose
    def loadCompanyByPage(self, *args, **kwargs):
        companyName = kwargs.get('companyName', '')
        pageIndex = kwargs.get('pageIndex')
        companyAmountPerPage = kwargs.get('companyAmountPerPage')
        companyAmountPerPage = int(companyAmountPerPage)
        
        callback = kwargs.get('callback', '')
        
        #print callback
        
        companyCollection = self.db.company
        cursor = companyCollection.find({"companyName": re.compile(companyName, re.IGNORECASE)}, {"companyName":1, "funding":1, "industry":1, "foundedDate":1, "employees":1, "_id":0}).sort("fundingAmount", -1).skip(int(pageIndex) * companyAmountPerPage).limit(companyAmountPerPage)
        dataList = []
        for row in cursor:
            dataList.append(row)
            
        #print dataList
        jsonResponse = json.dumps({"companies" : dataList})
        
        # This line is necessary to return the JSON object
        cherrypy.response.headers["Content-Type"] = "application/json"
        if callback:
            return callback + '(' + jsonResponse + ')'
        return jsonResponse
    
    
    @cherrypy.expose
    def loadCompaniesTillPage(self, *args, **kwargs):
        companyName = kwargs.get('companyName', '')
        pageIndex = kwargs.get('pageIndex')
        companyAmountPerPage = kwargs.get('companyAmountPerPage')
        companyAmountPerPage = int(companyAmountPerPage)
        
        callback = kwargs.get('callback', '')
        
        #print callback
        
        companyCollection = self.db.company
        cursor = companyCollection.find({"companyName": re.compile(companyName, re.IGNORECASE)}, {"companyName":1, "funding":1, "industry":1, "foundedDate":1, "employees":1, "_id":0}).sort("fundingAmount", -1).limit((int(pageIndex) + 1) * companyAmountPerPage)
        dataList = []
        for row in cursor:
            dataList.append(row)
            
        #print dataList
        jsonResponse = json.dumps({"companies" : dataList})
        
        # This line is necessary to return the JSON object
        cherrypy.response.headers["Content-Type"] = "application/json"
        if callback:
            return callback + '(' + jsonResponse + ')'
        return jsonResponse
    
    
    @cherrypy.expose
    def countPages(self, *args, **kwargs):
        companyName = kwargs.get('companyName', '')
        companyAmountPerPage = kwargs.get('companyAmountPerPage')
        companyAmountPerPage = round(float(companyAmountPerPage), 1)
        callback = kwargs.get('callback', '')
        #print callback
        
        companyCollection = self.db.company
        
        totalRecords = companyCollection.find({"companyName": re.compile(companyName, re.IGNORECASE)}, {'_id':1}).count()
        pageAmount = math.ceil(totalRecords / companyAmountPerPage)
        
        jsonResponse = json.dumps({"pageAmount" : pageAmount})
        
        # This line is necessary to return the JSON object
        cherrypy.response.headers["Content-Type"] = "application/json"
        if callback:
            return callback + '(' + jsonResponse + ')'
        return jsonResponse
    
    
    @cherrypy.expose
    def searchCompanyByName(self, *args, **kwargs):
        companyName = kwargs.get('companyName', '')
        callback = kwargs.get('callback', '')
        #print callback
        
        companyCollection = self.db.company
        cursor = companyCollection.find({"companyName": companyName}, {"companyName":1, "homepageurl":1, "funding":1, "industry":1, "employees":1, "foundedDate":1, "fundings":1, "_id":0})
        for row in cursor:
            data = row
            
        jsonResponse = json.dumps({"company" : data})
        
        # This line is necessary to return the JSON object
        cherrypy.response.headers["Content-Type"] = "application/json"
        if callback:
            return callback + '(' + jsonResponse + ')'
        return jsonResponse
    
    
    @cherrypy.expose
    def searchCompanyByImpreciseName(self, *args, **kwargs):
        companyName = kwargs.get('companyName', '')
        callback = kwargs.get('callback', '')
        #print callback
        
        companyCollection = self.db.company
        cursor = companyCollection.find({"companyName": re.compile(companyName, re.IGNORECASE)}, {"companyName":1, "funding": 1, "industry":1, "_id":0})
        companyList = []
        for row in cursor:
            companyList.append(row)
        jsonResponse = json.dumps({"companies" : companyList})
        
        # This line is necessary to return the JSON object
        cherrypy.response.headers["Content-Type"] = "application/json"
        if callback:
            return callback + '(' + jsonResponse + ')'
        return jsonResponse
    
    
    @cherrypy.expose
    def getOfficesByCompanyName(self, *args, **kwargs):
        companyName = kwargs.get('companyName', '')
        callback = kwargs.get('callback', '')
        #print callback
        
        companyCollection = self.db.company
        cursor = companyCollection.find({"companyName": companyName}, {"offices":1, "_id":0})
        for row in cursor:
            data = row.get('offices')
        jsonResponse = json.dumps({"offices" : data})
        
        # This line is necessary to return the JSON object
        cherrypy.response.headers["Content-Type"] = "application/json"
        if callback:
            return callback + '(' + jsonResponse + ')'
        return jsonResponse
    
    
    @cherrypy.expose
    def getAffiliatedPeopleByCompanyName(self, *args, **kwargs):
        companyName = kwargs.get('companyName', '')
        callback = kwargs.get('callback', '')
        #print callback
        
        companyCollection = self.db.company
        cursor = companyCollection.find({"companyName": companyName}, {"relationships":1, "_id":0})
        data = cursor[0].get('relationships')
            
        jsonResponse = json.dumps({"relationships" : data})
        
        # This line is necessary to return the JSON object
        cherrypy.response.headers["Content-Type"] = "application/json"
        if callback:
            return callback + '(' + jsonResponse + ')'
        return jsonResponse
    
    
    @cherrypy.expose
    def getCompanyOverviewByCompanyName(self, *args, **kwargs):
        companyName = kwargs.get('companyName', '')
        callback = kwargs.get('callback', '')
        #print callback
        
        companyCollection = self.db.company
        cursor = companyCollection.find({"companyName": companyName}, {"cboverview":1, "_id":0})
        data = cursor[0].get('cboverview')
        data = re.sub('<a[^>]*>', '', data)
        data = re.sub('</a>', '', data)
        
        jsonResponse = json.dumps({"overview" : data})
        
        # This line is necessary to return the JSON object
        cherrypy.response.headers["Content-Type"] = "application/json"
        if callback:
            return callback + '(' + jsonResponse + ')'
        return jsonResponse
    
    
    @cherrypy.expose
    def getCompanyWikiLinkByCompanyName(self, *args, **kwargs):
        companyName = kwargs.get('companyName', '')
        callback = kwargs.get('callback', '')
        #print callback
        
        companyCollection = self.db.company
        cursor = companyCollection.find({"companyName": companyName}, {"wikiUrl":1, "_id":0})
        data = cursor[0].get('wikiUrl')
        
        jsonResponse = json.dumps({"wikiUrl" : data})
        
        # This line is necessary to return the JSON object
        cherrypy.response.headers["Content-Type"] = "application/json"
        if callback:
            return callback + '(' + jsonResponse + ')'
        return jsonResponse


    @cherrypy.expose
    def getCompanyLogo(self, *args, **kwargs):
        companyName = kwargs.get('companyName', '')
        companyCollection = self.db.company
        cursor = companyCollection.find({"companyName": companyName}, {"logo":1, "_id":0})
        for row in cursor:
            imageData = row.get('logo')
        # This line is necessary to return the image
        cherrypy.response.headers["Content-Type"] = "image/PNG"
        return imageData

    
    @cherrypy.expose
    def getEdgarDoc(self, *args, **kwargs):
        companyName = kwargs.get('companyName', '')
        callback = kwargs.get('callback', '')
        #print callback
        
        companyCollection = self.db.company
        cursor = companyCollection.find({"companyName": companyName}, {"edgarDoc":1, "_id":0})
        edgarDoc = cursor[0].get(('edgarDoc'))
        if edgarDoc is None:
            jsonResponse = json.dumps({"detail" : "none"})
        else:
            company = edgarDoc.get(companyName)
            if company is None:
                jsonResponse = json.dumps({"detail" : "none"})
            else:
                detail  = company.get(('detail'))
                jsonResponse = json.dumps({"detail" : detail})
        
        # This line is necessary to return the JSON object
        cherrypy.response.headers["Content-Type"] = "application/json"
        if callback:
            return callback + '(' + jsonResponse + ')'
        return jsonResponse




if __name__ == '__main__':
    # Config for our CherryPy webserver
    config = {
              'global': {
                         'server.socket_host': "0.0.0.0",
                         'server.socket_port': 7079,
                         'server.thread_pool': 10,
                         'engine.autoreload_on':False,
                         }
              }
    cherrypy.config.update(config['global'])
    cherrypy.tree.mount(CompanyMain(), config=config)
    
    try:
        cherrypy.engine.start()
        print 'Successfully started control panel'
        cherrypy.engine.block()
    except socket.error, fault:
        print 'Unable to start control panel: ', fault
