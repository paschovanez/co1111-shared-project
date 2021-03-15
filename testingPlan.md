# Testing plan 

## Purpose: 

The main purpose of this plan is to introduce a testing strategy, which will be used to test the web application.  
In addition, the testing plan introduces the ways of how testing results should be recorded.  
## Project Overview:
Web application Treasure Hunt is an online quiz, in which players can answer specific questions, that depend on their location at the moment of playing the game.  
Functionality includes geolocation, QR code scanner, use of API and use of cookies.  
## Testers:
Testers will perform tasks specified in this testing plan and will record the results of the testing on this page.   
For now, the testing team consists of: Pavel Telnov.  
The testing team may change over time, if it did so, the Testers section must be updated.  
## Test objectives
The objective of the testing of the Web Application is to ensure that the functionality of Treasure Hunt is working according to the given specifications.  
The final result of the testing should include:   
Tested software, which is free of major errors, and which is passed the specifications.  
Testing page, which will use a Testing API to insure that Treasure Hunt is working properly.   
Unit tests, which would help testing an application, must be commented out prior to submission.   
## Tests:
### Exploratory
The main type of tests, which would be performed, due to the lack of resources and time.    
Purpose: The main purpose of this type of test is to find major errors and remove them before another testing.    
Testers: Testing team    
Method: Exploratory testing does not require any documentation prior to testing, it is testing on the fly, in which testers come up with a test, which they execute immediately.     
### Functional test.
Purpose: Is to ensure that the output of the application is the same as the expected one, trough Unit tests    
Testers: Testing team    
Method: Creation and use of unit tests, which would use a Testing API to compare the expected output with an existing one.     
### User acceptance Test
Scope: Getting the list of games, Main game functionality(getting questions, sending answers), QR code scanner,  Geolocation, Leaderboard     
Assumptions:     
All test cases related to UAT must be documented on the testing page    
Testers: Pavel Telnov   
Time frame: Test results should be provided by 23 March 2021.    
Resources:    
Human resources(At the moment of creating the plan): 1 tester for 10 days.    
Tested operating systems: Windows 10   
Browser tests: Firefox, Chrome, Safari, Edge. 

#### UAT Risks
1.	Not properly trained testers High Med    
2.	Lack of testers High Med   
#### UAT entry criteria
All features must be implemented     
All critical bugs must be fixed   
Before UAT exploratory and functional testing should be done.    
#### Test Cases:
Getting a list of games:     
1.	Visit: https://paschovanez.github.io/co1111-shared-project/index.html   
2.	Click the start button   
Expected result: Under “Choose your game:” Different treasure hunts, which can be selected, must appear.    

Getting a question:   
1.	Visit: https://paschovanez.github.io/co1111-shared-project/index.html     
2.	Click the start button   
3.	Enter your name, number of game and choose the treasure hunt, if the name is already taken try to use another name.   
4.	Click the start button    
Expected result: The first question of the game should appear with an input field related to this question.    

Sending the correct answer:    
1.	Visit: https://paschovanez.github.io/co1111-shared-project/index.html   
2.	Click the start button    
3.	Enter your name, number of game and choose the treasure hunt, if the name is already taken try to use another name.    
4.	Click the start button.           
5.	Enter the answer.                   
Expected result: If the answer was correct, the message: ‘Well done!’ should be displayed and the score must change. The next question should be displayed.                         

Sending an incorrect answer:                     
1.	Visit: https://paschovanez.github.io/co1111-shared-project/index.html           
2.	Click the start button                   
3.	Enter your name, number of game and choose the treasure hunt, if the name is already taken try to use another name.                
4.	Click the start button.                
5.	Enter the answer.             
Expected result: If the answer was incorrect, message: ‘Wrong answer: [your answer]’ should be displayed and the score must be changed                     

Geolocation:                       
1.	Visit: https://paschovanez.github.io/co1111-shared-project/index.html                  
2.	Click the start button                    
3.	Enter your name, number of game and choose the treasure hunt, if a name is already taken try to use another name.                   
4.	Click the start button.              
5.	Answer the questions, until you get a location related one.               
6.	Answer the question using an emulator of your location with the specified coordinates.          
Expected result: 1.1 If coordinates and answer were correct. ‘Well done' message should be displayed. The next question should be displayed.         
1.2 If the answer was incorrect: the message ‘Wrong answer: [your answer]’ should be displayed and the score must be changed              
1.3 If answer is right and coordinates are incorrect message: ‘This is a location-sensitive question and your current location appears to be [distance] kilometers from the target which is further than the limit of [limit] meters.’ Should be displayed.             

Leaderboard:          
1.	Visit: https://paschovanez.github.io/co1111-shared-project/index.html   
2.	Click the start button            
3.	Enter your name, number of game and choose the treasure hunt, if name is already taken try to use another name.      
4.	Click the start button.     
5.	Answer the questions, until you’ve finished the game.                  
Expected result: First 15 players should be displayed as a table.                