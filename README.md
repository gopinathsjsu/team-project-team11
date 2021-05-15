
# Online Banking

### Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
    - [Customer](#features)
    - [Admin](#features)
3. [Design Decision](#introduction) 
4. [Architecture](#architecture)
5. [Developer Logs](#logs)
    - [Project Journals](#logs)
    - [SCRUM Board](#logs)
    - [Burndown Chart](#logs)
    - [Restrospective Report](#logs)
6. [Screenshots]()
7. [UI Wireframes]()
8. [Installations]()


## Introduction

A Banking application that allows user to perform Banking related operations such as add new accounts, perform transactions and view transaction history.

### Design Decision



<strong>Team Members</strong>

[@singhal-akash67](https://github.com/singhal-akash67) - Akash Singhal(SJSU ID: 015257203) akash.singhal@sjsu.edu

[@narensulegai](https://github.com/narensulegai) - Naren Sulegai(SJSU ID: 014483443)

[@NehaPoonia](https://github.com/NehaPoonia)
[@Nehapoonia01](https://github.com/Nehapoonia01) - Neha Poonia(SJSU ID: 015252900)

[@sowmyadvn](https://github.com/sowmyadvn) - Sowmya Dharani(SJSU ID: 01145168)

## Features

### Customer API

- Add a new account to the system(Checking,Savings).
- Remove existing accounts (only if there is no balance in the account)
- Add manual transactions.

### Admin API

- Internal transaction, from one account to another.
- External transactions to non-member accounts of the bank.
- Setting up recurring transactions for internal or external payments
- Search and view transactions by date/account number etc.
- Download transaction history.

## Architecture

### Deployment Diagram

![Deplyment diagram](https://user-images.githubusercontent.com/436710/118338119-345f8200-b4ca-11eb-82e0-72777e22d6b8.png)

### Architecture Diagram

![Architecture diagram](https://user-images.githubusercontent.com/436710/118338194-59ec8b80-b4ca-11eb-811d-c6960975fa88.png)

## Logs

### Project Journal

<strong>1. Communication:</strong>

All of us started working together on requirements and understanding the functionality to be implemented.we worked jointly in developing the APIs. All decisions were made as a team - right from deciding on technology stack ,creating schema for the project to deploying the project. This resulted in rapid feature development and deployment.
We initiated a Whatsapp group discussion as well as did daily virtual meeting for half an hour to have recent progress on the project and to make sure that everyone is on the same page. Initially we had lots of discussions on how to work on implementation of certain features. This includes speaking up against what would not work and anything that affects the project’s effectiveness, or accept feedback and improve methodologies.
We had status calls for 10 minutes, the entire week, to sync up on our status. Set up a zoom meeting to discuss the roadblocks.We used Github scrum boards to create issues and this helped us in tracking open issues and helped us to complete the project successfully. We also created a shared drive so that everyone can work collaboratively on the project.


<strong>2. Simplicity:</strong>

The code implemented is simple, easy to understand and well-documented. In the future, if we plan to modify or add certain functionalities, the task would be simple, as the components are modular and well documented.


<strong>3. Feedback:</strong>

During the one week of development, each team member developed their API and got feedback from other members of the team. Everyone not only tested their API but also tested the APIs of other team members and tested all corner cases. The outcome of this effort was the creation of a set of robust APIs. After every iteration we had a retrospective meeting where we discussed on:
What went well in the Sprint
What could be improved
What will we commit to improve in the next Sprint

<strong>4. Respect:</strong>

Each team member completed the task assigned to them on time. Each one of us take full ownership of their tasks  and have a common goal.

<strong>5. Courage:</strong>

During the feedback phase, each team member was open to criticism and handled the feedback in a positive manner.
One activity of deploying services to AWS in an Auto Scaled EC2 Cluster with Load Balancer and deploying to AWS as Docker Containers in Amazon Containers is a perfect example of our team following the XP values. No one had prior experience in deploying services to scalable servers/dockers. Hence , we decided to tackle the problem together. We read articles and figured out a way to deploy the services successfully.This activity marks all the checkboxes of XP core values - communication, feedback, respect, courage and simplicity.


### SCRUM Board  
Available through [GitHub Projects](https://github.com/gopinathsjsu/team-project-team11/projects/1)

### Scrum Reports
Available through [Google doc](https://docs.google.com/document/d/1lR37BgjGFATiawGvg2b6EmVbriWMKsb0/edit#)

### Burndown Chart and Sprint Task Sheet
Available through [Google Sheets](https://docs.google.com/spreadsheets/d/118Si_9tcA6yhdAZxVI9X9ussRIL2_QdD/edit#gid=1553378638)

### Retrospective Report
Available through [Google Sheets](https://docs.google.com/spreadsheets/d/1OVUVLzsPvVqzPw-Gw1veBeDNmXOwAUsa/edit#gid=1151585607)



### Installations

Install k3d for local cluster 
https://en.sokube.ch/post/k3s-k3d-k8s-a-new-perfect-match-for-dev-and-test

### EKS
1. Create cluster with all defaults
2. Select node IAM Role eks
3. SSH key pair 86narensj
4. Node Group scaling configuration - Min/Max set 1

### Deploy using help
```
# create a cluster - ingress port 8004->80
k3d cluster create unitedbank --port 8004:80@loadbalancer
# show all context
kubectl config get-contexts
# show current context - this should be set to k3d-unitedbank automatically
kubectl config current-context
# create a new namespace
kubectl create namespace unitedbank
# set default namespace
kubectl config set-context --current --namespace=unitedbank
# test if frontend service is up
kubectl port-forward service/frontend 8006:80
# delete everything
kubectl delete all --all -n unitedbank && kubectl delete ingress unitedbank
```

### Deploy using helm
(Assuming that a cluster is created on AWS)
```
# check template
helm template -f production.yaml unitedbank ./helm
# deploy (install if not)
helm upgrade --install -f production.yaml unitedbank ./helm
# check status
kubectl get all
# App url -> A new load balancer will be created (use http not https)
# Delete nodegroup before deleing cluster
```

### EKS
```
# check context
kubectl config get-contexts
# set context
kubectl config current-context <context>
# print
aws eks update-kubeconfig --name unitedbank --dry-run
```

### TODO
Setting up ingress
https://faun.pub/learning-kubernetes-on-eks-by-doing-part-4-ingress-on-eks-6c5e5a34920b

### Dev set up 

1. Install node and npm
2. Install mongodb locally ex for mac use $  brew tap mongodb/brew && brew install mongodb-community && brew services start mongodb/brew/mongodb-community

```
# to start React frontend

# start frontend
cd frontend && npm install && export REACT_APP_API_URL=http://localhost:5000 && npm start

# please configure your mongodb connection string in backend/.env

# to start node backend
cd backend && npm install && npm start
```
