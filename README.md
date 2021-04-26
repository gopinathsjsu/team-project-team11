
# Online Banking System


```
A banking application which exposes API calls to add new accounts, perform transactions and view transaction history.
```


### Architecture Diagram

![111834560-00dcee80-88b1-11eb-85e4-5368e3be0f9d](https://user-images.githubusercontent.com/436710/115127619-abb5fa80-9f8c-11eb-9e41-cbab051c059c.png)
Install k3d for local cluster 
https://en.sokube.ch/post/k3s-k3d-k8s-a-new-perfect-match-for-dev-and-test


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

### Deploy using help

```
# check template
helm template -f production.yaml unitedbank ./helm
# deploy (install if not)
helm upgrade --install -f production.yaml unitedbank ./helm
# check status
kubectl get all
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

# set the below env variable
export REACT_APP_API_URL=http://localhost:5000
# start frontend
cd frontend && npm install && npm start

# please configure your mongodb connection string in backend/.env

# to start node backend
cd backend && npm install && npm start
```


### XP Core Value

#### Simplicity : Akash
To keep the thing Simple we followed a rule, First focus on core features which are asked and then improve it further which is in scope. We made small and simple steps to reach our target and mitigated failures as they happen.We created something that we are proud of and will maintain it for a long term for reasonable costs. Communication and Simplicity support each other. The more you communicate the clearer you can see exactly what needs to be done, and you gain more confidence about what really need not be done.

#### Feedback : Sowmya
Combined with simplicity and courage I implemented feedback value while working on our project. Every commitment was taken seriously by delivering a working software. The software is delivered early to the other team members and a feedback is taken so that necessary changes can be made if needed. Concrete feedback about the current state of the system is necessary. The value of the feedback was a continuously running system that delivered information about itself in a reliable way.

#### Respect and Simplicity : Neha
Combined with communication, simplicity, and feedback, respect added value to the overall software development process. Respect is a core value, one that lies below the surface of the other four values. I implemented simplicity value while writing the API’s by building what is needed first by making small and simple steps. And made sure that respect value is also satisfied by continuously checking the below points:
Everyone gives and feels the respect they deserve as a valued team member. 
Everyone contributes values such as enthusiasm and responsibility.

#### Communication and Courage : Naren
Success of a project relies heavily on Communication. Lack of communication creates problems. I made sure that all the team members are communicating well on a constant and continuous basis. I have created a Whatsapp group as well as We did daily virtual meeting for half an hour to have recent progress on the project and to make sure that everyone is on the same page. Initially we had lots of discussions on how to work on implementation of certain features. This includes speaking up against what would not work and anything that affects the project’s effectiveness, or accept feedback and improve methodologies.


