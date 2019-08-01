pipeline {
    agent none

    stages {
        stage('Install') {
            agent {
                label 'master'
            }
            steps {
                sh '''
                    cnpm install
                '''
            }
        }
        stage('Build') {
            agent {
                label 'master'
            }
            steps {
                sh '''
                    cnpm run build
                '''
            }
        }
        stage('Deploy Dev') {
            agent {
                label 'master'
            }
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no -i ~/.ssh/ooclserver_rsa root@39.98.243.100 "rm -rf /usr/share/nginx/client/dist"
scp -o StrictHostKeyChecking=no -i ~/.ssh/ooclserver_rsa -r /var/lib/jenkins/workspace/prod-parking-tag-frontend-client/dist root@39.98.243.100:/usr/share/nginx/client/
                '''
            }
        }
        stage('Approve of Deploy Prod') {
          steps {
            input message: 'deploy to Prod?'
          }
        }

        stage('Deploy Prod') {
            agent {
                label 'master'
            }
            steps {
                sh '''
                    echo deploy prod
                '''
            }
        }
    }
}
