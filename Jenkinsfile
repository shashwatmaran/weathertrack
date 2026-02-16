pipeline {
    agent any

    tools {
        nodejs 'node25'
    }

    stages {

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: '**/*.js', fingerprint: true
            echo 'Artifacts archived'
        }
        failure {
            echo 'Build failed'
        }
    }
}
