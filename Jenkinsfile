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
                script {        
                    try {
                        sh 'npm i'
                        sh '''#!/bin/bash

                        npm --version;
                        node --version;

                        echo "------> Install node modules <-------";
                        npm install -g artillery@latest;'''
                        sh '''npm install node-jq --save'''
                        sh '''mkdir -p 'reports' '''
                        sh """artillery run --output reports/new-report${env.BUILD_ID}.json simple.yml"""
                        sh """jq ".aggregate reports/new-report${env.BUILD_ID}.json" """
                        sh """artillery report reports/new-report${env.BUILD_ID}"""
                        testPassed = true
                    }catch (Exception e) {
                        testPassed = false
                    }finally {
                        if(testPassed){
                            sh '''echo "Test Passed"'''
                            echo """Running ${env.BUILD_ID}"""
                            archiveArtifacts 'reports/*'
                        }
                    }
                }
                /*sh '''artillery run -o reports/reportJS2.json simple.yml;
                artillery report reports/reportJS2 reports/reportJS2.json;
                '''*/
            }
        }
        /*
        stage('Performance Test on Flask') {
            steps {
                sh 'npm i'
                sh '''#!/bin/bash

                npm --version;
                node --version;

                echo "------> Install node modules <-------";
                npm install -g artillery@latest;'''
                sh '''mkdir -p 'reports' '''
                sh '''artillery run -o reports/reportPY2.json simplepython.yml;
                artillery report reports/reportPY2.html reports/reportPY2.json;
                '''
            }
        }*/
    }

    post {
        success {
            archiveArtifacts 'reports/*'
        }
    }

}
