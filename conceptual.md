### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
  - JWT is a json web token, it is a standard allowing to securely create data, authenticate a user. Token is a string consisting of three parts: encoded header, payload and signature.

- What is the signature portion of the JWT?  What does it do?
  - Signature is a combined version of a header and a payload, signed with secret key.

- If a JWT is intercepted, can the attacker see what's inside the payload?
  - yes, the attacker can decode a payload, however the user is still protected with a signature as it is signed with secret key.

- How can you implement authentication with a JWT?  Describe how it works at a high level.
  - Client sends some data to the server, for example username and password. Server receives the data, authenticates a user and creates an individual token that is atached to user's data for future use. Client receives a token for a user, that is being attached with every request to the server to authenticate that user. Each time server receives a user with correct token, the user is authenticated.
  
- Compare and contrast unit, integration and end-to-end tests.
  - End-to-end testing is a large test of entire application from start to finish, it simulates real user scenario. Integration testing is testing app in a group of functions, or features or modules. Unittesting is testing individual parts of an application. Unittesting tests smallest parts in comparison to integration testing and end-to-end testing.
  
- What is a mock? What are some things you would mock?
  - Mocking is useful primarily in unittesting. Developer mocks an object to isolate it from complex dependencies, which could be harder to test. To do that, developer replaced original object with a copy of that object to simulate the behavior and test it without changing the original object.

- What is continuous integration?
  - It is an engineering practice of merging the code more frequently after small changes, rather than waiting for a big change to merge. It helps with testing smaller amounts of code more frequently, and automate running tests when pushing the code.

- What is an environment variable and what are they used for?
  - We use environmental variables to configure parts of application. Those variables are built as a key-value pair. Node.js  has a process codule with env property that stores environmental variable for future use.

- What is TDD? What are some benefits and drawbacks?
  - TDD is Test Driven Development, when an engineer decides to write tests for the app before writing initial code. Tests will fail at the beginning, but they will serve as a guide for developer to write the application code. Benefits include saving time with code in the future, meaning when the tests are organized and written, it is easier for them to guide a developer to write a code that fits the tests. Code this way may also look cleaner, since it will be easy to test. Drawbacks include errors in initial tests, which them will result in fixing errors not only in application code, but in testing part of the code. Moreover, usually developers learn how to code first before they learn how to test, so switching coding experience to testing first might take a while to get used to. Also, if developer works in a team, it is important to decide if entire team will do TDD otherwise it might be a reason for confusion and errors in code.

- What is the value of using JSONSchema for validation?
  - JSONSchema validation make it easier to create a human-readable "documentation" of how code should look like and which requirements to have. Schema easily describes the structure of the data in a way that developers can use for automating validation.

- What are some ways to decide which code to test?
  - Testing is important for the main routes and features of the app, for everything that can potentially break easily. Testing for working routes in the app is very important, as well as all edge cases that might occur. If developer tries to imitate how user will use the app, they should follow those patterns to decide which features should be definitely tested.
  
- What are some differences between Web Sockets and HTTP?
  - Websockets are stateful unlike HTTP, they also smaller in code and not as heavy as HTTP. Websockets stay connected to server unless we close them.

- Did you prefer using Flask over Express? Why or why not (there is no right answer here --- we want to see how you think about technology)?
  - So far I prefer Flask over Express, as I think it is easier to learn and requires less code for similar actions I would like to do with Express. Flask Models and Forms on backend also require less code and are easier to connect to the application. I feel like if I were to do the same app in Flask and in Express, Flask would save me time in writing code. The good thing about Express is that it uses JavaScript syntax on backend, which is very useful as developer doesn't have to write an application in multiple languages and switch them all the time (less errors). I do enjoy JavaScript as a language the most, so I might get used to Express in the future with more projects to come.
