# Facial_Recognition_system-using-serverless-architecture

The primary goal of this project is to design and implement a serverless facial recognition system 
using Amazon Web Services (AWS). The system aims to provide accurate, scalable, and efficient 
face detection and recognition capabilities without the complexity of managing server 
infrastructure. The key objectives of this project are: 
1. Real-time Face Detection and Recognition: 
o Develop a system that can accurately detect and recognize faces from uploaded 
images in real-time. 
o Leverage Amazon Rekognition to handle facial analysis tasks such as face 
detection, comparison, and indexing. 
2. Scalable and Event-Driven Architecture: 
o Implement a fully serverless architecture using AWS Lambda, ensuring automatic 
scaling and efficient resource management based on demand. 
o Use Amazon S3 to store input images, which will trigger AWS Lambda functions 
for processing whenever a new image is uploaded. 
3. Cost-Effective Solution: 
o Utilize pay-as-you-go AWS services to keep the project cost-efficient by minimizing 
idle infrastructure costs. 
o Ensure that the system is optimized for performance and scalability without incurring 
unnecessary costs. 
4. Seamless User Integration: 
o Enable users to interact with the system via RESTful APIs exposed through 
Amazon API Gateway. 
o Provide functionalities such as user registration, face recognition, and result retrieval 
via a simple, secure API. 
5. Data Management and Storage: 
o Store face recognition results, metadata, and user information in a NoSQL database 
(Amazon DynamoDB) for fast querying and retrieval. 
8  
o Maintain a centralized database for efficient storage and access to user profiles, face 
IDs, and logs. 
6. Security and Privacy: 
o Implement security features such as Amazon Cognito for user authentication, 
ensuring only authorized users can interact with the system. 
o Protect face data and sensitive information through encryption and secure API 
access. 
 
Project Scope 
The scope of the project focuses on building a serverless facial recognition system capable of 
performing the following tasks: 
1. Face Registration: 
o Users can upload images for face registration. The system will index these faces in 
Amazon Rekognition's collection for future recognition. 
2. Face Recognition and Comparison: 
o The system will identify faces from uploaded images and compare them with 
previously registered faces. 
o Match results, along with confidence scores, will be returned to the user. 
3. Metadata Storage: 
o The system will store face recognition results, timestamps, user data, and image 
metadata in Amazon DynamoDB. 
4. API Interface: 
o The system will expose REST APIs to allow users to register, search for recognized 
faces, and retrieve recognition results. 
o API Gateway will act as the gateway for all interactions with the facial recognition 
system. 
5. Real-Time Processing: 
o The architecture will handle image processing in real time, with each uploaded image 
triggering an AWS Lambda function that interacts with Amazon Rekognition and 
9  
stores results in DynamoDB. 
6. System Security: 
o Only authenticated users will be able to register faces or retrieve recognition results. 
o Amazon Cognito will manage user authentication and access control. 
Limitations and Exclusions 
• Geographical Constraints: The system's functionality is designed to be global, but regional 
AWS availability may affect service performance in specific locations. 
• Large-Scale Real-Time Video Processing: While the system will handle individual 
images, processing real-time video feeds will require additional optimization, and is not part 
of the initial project scope. 
• Advanced Face Attributes: The focus will primarily be on basic face recognition. 
Advanced features such as emotion recognition, age estimation, or facial attribute analysis 
will not be included in this iteration. 
 
This system will be useful for a range of real-time applications, including security, attendance 
management, and personalized customer experiences, and aims to demonstrate how facial 
recognition can be implemented in a cloud-native, serverless environment.


• Amazon S3: Stores the images uploaded by users and triggers the workflow when a new 
image is uploaded. 
• AWS Lambda: Executes the logic to process the image, interact with AWS Rekognition, 
and store the results in DynamoDB. 
• Amazon Rekognition: Performs face detection, face comparison, and recognition using 
deep learning models. 
• Amazon DynamoDB: Stores metadata, user details, recognition results, and logs. 
12  
• Amazon API Gateway: Exposes RESTful APIs for user interaction with the system. 




AWS Lambda:


✅ Direct S3 trigger — The Lambda function was configured as an event notification target on the S3 bucket. Whenever a new image was uploaded to S3, it automatically invoked the Lambda function.
✅ Image processing — The Lambda function retrieved the uploaded image’s metadata and content from S3, then called Amazon Rekognition APIs via Boto3 to perform face detection and comparison.
✅ Result storage — After processing, Lambda wrote recognition results — including detected face IDs, match confidence, and timestamps — to Amazon DynamoDB, enabling easy retrieval, analysis, and auditing.
✅ Security — IAM roles were assigned to Lambda with least-privilege access, allowing it to read from S3, use Rekognition, and write to DynamoDB, while maintaining a secure environment.
✅ Scalable, event-driven execution — Lambda scaled automatically with incoming S3 upload events, enabling parallel, on-demand processing without managing servers or infrastructure.
