pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Restart Backend') {
            steps {
                dir('backend') {
                    sh '''
                    /usr/local/bin/pm2 restart backend || /usr/local/bin/pm2 start index.js --name backend
                    /usr/local/bin/pm2 save
                    '''
                }
            }
        }
    }
}