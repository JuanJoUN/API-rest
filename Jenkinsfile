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
                slackSend message:"You can access by clicking http://3.233.167.141:8080/job/cd-api_test/$BUILD_NUMBER/Test_20report/ or checking your mail inbox"
                
            }
            
        }
    }
    
    post {
        always {
            slackUploadFile filePath: 'ApiTesting.zip', initialComment: 'This the test report for Build $BUILD_NUMBER', credentialId: 'slackCredential'
            emailext attachmentsPattern: '**/ApiTesting.zip', body: 'This is a test email', mimeType: 'text/html', subject: 'Build $BUILD_NUMBER - $BUILD_STATUS', to: 'grupo3.praxis@outlook.com'
        }   
    }
}
