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
                        sh """artillery run --output reports/warm-up${env.BUILD_ID}.json warmup.yml"""
                        sh """artillery report --output reports/warm-up${env.BUILD_ID} reports/warm-up${env.BUILD_ID}.json """
                        testWarmup = true
                        sh """artillery run --output reports/ramp-up${env.BUILD_ID}.json rampup.yml"""
                        sh """artillery report --output reports/ramp-up${env.BUILD_ID} reports/ramp-up${env.BUILD_ID}.json """
                        testRampup = true
                        sh """artillery run --output reports/sustained${env.BUILD_ID}.json sustained.yml"""
                        sh """artillery report --output reports/sustained${env.BUILD_ID} reports/sustained${env.BUILD_ID}.json """
                        testSustained = true
                        sh """artillery run --output reports/overload${env.BUILD_ID}.json overload.yml"""
                        sh """artillery report --output reports/overload${env.BUILD_ID} reports/overload${env.BUILD_ID}.json """
                        testOverload = true
                    }catch (Exception e) {
                        testWarmup = false
                        testRampup = false
                        testSustained = false
                        testOverload = false
                    }finally {
                        if(testWarmup){
                            sh '''echo "Warmup Test Passed"'''
                            echo """Running ${env.BUILD_ID}"""
                        }
                        if (testRampup){
                            sh '''echo "Ramp-up Test Passed"'''
                            echo """Running ${env.BUILD_ID}"""
                        }
                        if (testSustained){
                            sh '''echo "Sustained Test Passed"'''
                            echo """Running ${env.BUILD_ID}"""
                        }
                        if (testOverload){
                            sh '''echo "Overload Test Passed"'''
                            echo """Running ${env.BUILD_ID}"""
                        }
                        if (testWarmup && testRampup && testSustained && testOverload){
                            sh '''echo "All Tests Passed"'''
                            echo """Running ${env.BUILD_ID}"""
                            archiveArtifacts 'reports/*'
                        }
                        testWarmup = false
                        testRampup = false
                        testSustained = false
                        testOverload = false
                    }
                }
                /*sh '''artillery run -o reports/reportJS2.json simple.yml;
                artillery report reports/reportJS2 reports/reportJS2.json;
                '''*/
            }
        }
        stage('Performance Test on Python flask') {
            steps {
                script {        
                    try {
                        sh 'npm i'
                        sh '''#!/bin/bash

                        npm --version;
                        node --version;

                        echo "------> Install node modules <-------";
                        npm install -g artillery@latest;'''
                        sh """artillery run --output reports/warm-upPY${env.BUILD_ID}.json warmupPY.yml"""
                        sh """artillery report --output reports/warm-upPY${env.BUILD_ID} reports/warm-upPY${env.BUILD_ID}.json """
                        testWarmup = true
                        sh """artillery run --output reports/ramp-upPY${env.BUILD_ID}.json rampupPY.yml"""
                        sh """artillery report --output reports/ramp-upPY${env.BUILD_ID} reports/ramp-upPY${env.BUILD_ID}.json """
                        testRampup = true
                        sh """artillery run --output reports/sustainedPY${env.BUILD_ID}.json sustainedPY.yml"""
                        sh """artillery report --output reports/sustainedPY${env.BUILD_ID} reports/sustainedPY${env.BUILD_ID}.json """
                        testSustained = true
                        sh """artillery run --output reports/overloadPY${env.BUILD_ID}.json overloadPY.yml"""
                        sh """artillery report --output reports/overloadPY${env.BUILD_ID} reports/overloadPY${env.BUILD_ID}.json """
                        testOverload = true
                    }catch (Exception e) {
                        testWarmup = false
                        testRampup = false
                        testSustained = false
                        testOverload = false
                    }finally {
                        if(testWarmup){
                            sh '''echo "Warmup Test Passed"'''
                            echo """Running ${env.BUILD_ID}"""
                        }
                        if (testRampup){
                            sh '''echo "Ramp-up Test Passed"'''
                            echo """Running ${env.BUILD_ID}"""
                        }
                        if (testSustained){
                            sh '''echo "Sustained Test Passed"'''
                            echo """Running ${env.BUILD_ID}"""
                        }
                        if (testOverload){
                            sh '''echo "Overload Test Passed"'''
                            echo """Running ${env.BUILD_ID}"""
                        }
                        if (testWarmup && testRampup && testSustained && testOverload){
                            sh '''echo "All Tests Passed"'''
                            echo """Running ${env.BUILD_ID}"""
                            archiveArtifacts 'reports/*'
                        }
                        testWarmup = false
                        testRampup = false
                        testSustained = false
                        testOverload = false
                    }
                }
            }
        }

    }
    post {
        success {
            archiveArtifacts 'reports/*'
        }
    }

}

