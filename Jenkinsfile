pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Test') {
            steps {
                    sh '`#!/bin/bash`
                    sudo apt install nodejs'
                    sh '''#!/bin/bash
                    node --version;
                    npm --version; 

                    echo "------> Install node modules <-------";
                    npm install -g newman;
                    npm install -g newman-reporter-htmlextra

                    echo "----running postman tests----";
                    echo "running post board request tests";
                    newman run "https://www.getpostman.com/collections/e5556fd000d5b6132693" --reporters cli,junit,htmlextra --reporter-junit-export "newman/integration-test-report.xml" ;
                    git log;'''

            }
        }
        stage('Deploy') {
            steps {
                echo 'Hello World'
            }
        }
    }
}