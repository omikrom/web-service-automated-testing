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
                    newman run "https://www.getpostman.com/collections/e5556fd000d5b6132693" --delay-request 5000 --reporters cli,junit,htmlextra --reporter-junit-export "newman/postreq-test-report.xml" ;
                    '''

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
                newman run "https://www.getpostman.com/collections/6e6ff6debb7621be8031" --delay-request 5000 --reporters cli,junit,htmlextra --reporter-junit-export "newman/userreq-integration-test-report.xml" ;
                '''
            }
        }
        stage('Performance Test on Expressjs') {
            steps {
                sh 'npm i'
                sh '''#!/bin/bash

                npm --version;
                node --version;

                echo "------> Install node modules <-------";
                npm install -g artillery@latest;'''
                sh '''mkdir -p 'reports' '''
                sh '''artillery run --output reports/reportJS.json simple.yml;
                artillery report --output reports/reportJS reports/reportJS.json;
                '''
                 }
        }
        stage('Performance Test on Flask') {
            steps {
                sh 'npm i'
                sh '''#!/bin/bash

                npm --version;
                node --version;

                echo "------> Install node modules <-------";
                npm install -g artillery@latest;'''
                sh mkdir(dir:"reports")
                sh '''artillery run --output reports/reportPY.json simplepython.yml;
                artillery report --output reports/reportPY reports/reportPY.json;
                '''
                 }
        }
    }

    post {
        success {
            archiveArtifacts 'reports/*'
        }
    }

}
