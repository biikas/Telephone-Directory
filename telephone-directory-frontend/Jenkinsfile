pipeline {
  agent any
  stages {
    stage('Npm Install') {
      when {
        expression {
          BRANCH_NAME ==~ /(master|master-dev|master-test)/
        }

      }
      steps {
         sh 'npm set registry http://10.13.194.3:4873'
         sh 'npm install'
      }
    }
  
    stage('Build Prod') {
      when {
        expression {
          BRANCH_NAME ==~ /(master|master-dev|master-test)/
        }

      }
      steps {
        sh 'npm run build --prod'
      }
    }
    stage('Deploy') {
          when {
            expression {
              BRANCH_NAME ==~ /(master|master-dev|master-test)/
            }

          }
          parallel{
            stage('Deploy Digital Counter web') {
          steps {
          sh'pwd'
			    sh 'sshpass -p banksmart@123 scp -r dist/campaign/* banksmart@10.13.194.173:/home/banksmart/www/digital-counter'
             }
            }
            }
          }
  }
   options {
      	buildDiscarder(logRotator(numToKeepStr: '2', artifactNumToKeepStr: '2'))
     }
}
