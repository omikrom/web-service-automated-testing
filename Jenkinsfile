pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm i'
                sh 'npm --version'
                sh 'node --version'
            }
        }
        stage('Test Post board requests') {
            steps {
            
                    sh 'npm i'
                    sh '''#!/bin/bash
                    
                    npm --version; 
                    node --version;

                    echo "------> Install node modules <-------";
                    npm install -g newman;
                    npm install -g newman-reporter-htmlextra

                    echo "----running postman tests----";
                    echo "running post board request tests";
                    newman run "https://www.getpostman.com/collections/e5556fd000d5b6132693" --reporters cli,junit,htmlextra --reporter-junit-export "newman/postreq-test-report.xml" ;
                    git log;'''

            }
        }
        stage('Test User Requests') {
            steps {
                sh 'npm i'
                sh '''#!/bin/bash
                    
                npm --version; 
                node --version;

                echo "------> Install node modules <-------";
                npm install -g newman;
                npm install -g newman-reporter-htmlextra

                echo "----running postman tests----";
                echo "running post board request tests";
                newman run "https://www.getpostman.com/collections/6e6ff6debb7621be8031" --reporters cli,junit,htmlextra --reporter-junit-export "newman/userreq-integration-test-report.xml" ;
                git log;'''
            }
        }
        stage('Staging') {
            steps {
                echo 'Current Branch: ' + env.GIT_BRANCH
                withCredentials([usernamePassword(credentialsId: 'ci-github', passwordVariable: 'L0v31987#', usernameVariable: 'omikrom')]) {
                    sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/omikrom/web-service-automated-testing.git')
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Hello World'
            }
        }
    }
}