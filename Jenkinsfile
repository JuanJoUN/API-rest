pipeline {
    agent any
    stages{
        stage('Install dependencies'){
            steps{
                sh "npm install"
            }
        }
        stage('test') {
            steps{
                sh "npm test"
            }
        }
        stage('Publish test report') {
            steps {
                publishHTML (target : [allowMissing: false,
                 alwaysLinkToLastBuild: true,
                 keepAll: true,
                 reportDir: '/var/lib/jenkins/workspace/cd-api_test/report/',
                 reportFiles: 'ApiTesting.html',
                 reportName: 'Test report',
                 reportTitles: 'Test report'])
                sh "zip -r ApiTesting.zip report/"
                slackSend message:"-- $JOB_NAME -- You can access the tests report by clicking http://3.233.167.141:8080/job/cd-api_test/$BUILD_NUMBER/Test_20report/ or checking your mail inbox"
                
            }
            
        }
    }
    
    post {
        always {
            slackUploadFile filePath: 'ApiTesting.zip', initialComment: 'This the test report for Build $BUILD_NUMBER', credentialId: 'slackCredential'
            emailext attachmentsPattern: '**/ApiTesting.zip', body: 'Here is the file which contains the tests report', mimeType: 'text/html', subject: '-- $JOB_NAME -- Build $BUILD_NUMBER - $BUILD_STATUS', to: 'grupo3.praxis@outlook.com'
        }   
    }
}
