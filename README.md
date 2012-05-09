SecondMarket-NYU-Spring-2012-Mobile
===================================

Project Description

The SecondMarket mobile app allows users to discover new private companies on the iPhone mobile devices. It provides aggregated data access to the investors, which can help them figure out whether a private company is an attractive investment, or learn about new companies to invest in by browsing most of the private companies running in the real business. The mobile application sits on the web application project that aggregates the data from CrunchBase, Wikipedia and SEC (EDGAR database), and provides the most up-to-date information to investors at their fingertips. While this app currently requires a network connection to be used, in the future, our group can deploy caching capabilities and local storage techniques that will allow users to access information from the mobile app without Internet access. Our data is stored on the websys server in MongoDB database and pulled to the mobile app using a python program as the server-side script. 

The app is intuitive and simple to use. The user can navigate through the different features through the five buttons on the footer: Chart (“The top 10 funding companies” clickable and interactive chart), Search (to search for a company by name), History (to view recent searches), Browser (to launch external web browser from within the app) and About (information about “SecondMarket” company). 

To improve this mobile app in the future, we would like the bar chart to show most recent funded companies (by rank) instead of overall highest funding as it stands now. We would also like to cache items on the local device so the app can load faster each time it runs. Another option we are considering is a login page so that users can create their own "watchlists" of companies they are interested in following. 


Project Structure:
 

The backend can be logically split into two parts: 

1. The web server acts as the middle layer between database and front end, which handles the request by retrieving the data from database and formatting the data into required format and returning it back to the front end. 

2. The database that hosts comprehensive company data from different data sources including CrunchBase, Wikipedia and EDGAR, and updates periodically by running the web application program. 



Technology Used

(1) Python programming language
We compared several possible programming languages and frameworks, including Java with JSP, PHP and Python, and finally decided to build the web server using python as the server-side script, MongoDB as the database management system. 

Python has several advantages based on the current application requirement. First of all, Python is an agile programming language, which is also a general purpose scripting language often used to develop web application. Secondly, “Cherrypy” is a lightweight web server framework but proven to be stable and fast. It allows developers to develop applications in the similar way of building object-oriented program.  “Easy to run” and “Easy to configure” are the most charming features of “Cherrypy”.  Thirdly, “PyMongo” is another convenient tool working with “MongoDB” by using Python programming language; it provides most of the MongoDB API functions that makes “Data Access Operations” much more easier.
 
Cheerypy configuration

(2) MongoDB
MongoDB is a document-based storage, which is quite different from relational databases, for example, MySQL, Oracle. The most outstanding feature of MongoDB is that it stores data in key/value pair style, which can be easily mapped with JSON data format, which also allows complex query with high performance.
 
(3) HTML, CSS, jQuery and jQueryMobile
 We use the typical web application technologies for our front-end development, as well as jQueryMobile to design and display the mobile application user interface. 

The application consists of five html pages that present different functionalities with different layouts, specifically, index.html initializes the cookies for storing temporary data (e.g. pagination index, browsing history) and shows the app launching logo; main.html presents the “FusionChart” to display the funding data; search.html provides the search interface and paginated company records; profile.html presents the detailed company information including company overview, affiliated people, office locations using GoogleMap API, funding rounds as well as EDGAR filings using multiple pages structure; about.html shows the brief instruction about the SecondMarket company. Each html page comes with JavaScript that applies different functions to page components, and AJAX is the main technology used for processing the request and response between client and server side. App screenshots as below:

(4) PhoneGap
We use PhoneGap to compile and build the “mobile adapted” application and run the app on the iPhone SKD 5.1 simulator in Xcode on Mac. 

(5) PhoneGap plugin---ChildBrowser
ChildBrowser is a PhoneGap plugin that allows displaying external webpages within the application, instead of launching other built-in application (e.g. iPhone Safari). We use this plugin to display the EDGAR filings (html and pdf) and company Wikipedia page, which are all external pages, the ChildBrowser has buttons for refreshing, navigating back and forwards as well as the option to switch to Safari browser. This feature improves the mobile app usability by providing the “built-in” browser as the platform, for example, it supports the native app style for playing the videos, open up Google search, as well as any other external webpages:
   


To test the app using iPhone simulator
1. Install MongoDB on server and run the command to import the sample data:
mongoimport -d secondmarket -c company company1110424.json
2. Run the server-side script “SecondMarketMain.py”
3. Import the project into Xcode (The latest Xcode should come with iPhone SDK simulator)
4. Build and run the mobile application

