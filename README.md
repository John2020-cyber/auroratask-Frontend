# FRONTEND Code Explaination
## Running code on local *nix machine
Frontend API is written in Nodejs using Express framework. The code sends "Hello Stakater" by default if no environment variable `NAME` is set. The code works on port `8081` be default and if given environment variable `PORT`, it will use that port number. It is uses localhost as ip address. `http://localhost:8081` displays the frontend output. 
## NOTE for FRONTEND
**The *NOEDJS* code of `frontend` uses `GMT+5` works fine in the `Docker Conatiners`. But on your local machine it will show you time `+5`. The date will also be `+1` on your local machine but will work fine on `Docker Containters`** Since the local machine should be set to local time. 

### How to run it.
Make sure you are running it on a Linux machine. Make sure you have installed `node 16 or above` and `npm` on your linux machine. I'll be working on Ubuntu, my commands will work on it. `git clone` the frontend into your machine.
```
cd aurotask-frontend
npm init --yes
npm i express
npm i axios
npm i nodemon (optional good for testing environment so you don't have to stop and start on change in code)
```
```
node frontend.js
 OR
nodemon frontend.js
```
If you want to pass your 'IP' in environment variable
```
NAME=*YOURIP* node frontend.js
```
If you want to pass your 'PORT' in environment variable
```
PORT=*PORT NUMBER* node frontend.js
```
You will get following output and you can access your api with browser `localhost:8081` or `curl http://localhost:8081`
```
Listening on port 8081..
Hello Stakater
```

## Running on Docker image
The Dockerfile is built using light image `node:slim` and install dependies to run our project with nodejs and express. Add the tag `frontend` while building the image to make our reference from `frontend` easier.
To build the frontend docker images. Dockerfile should exist in the directory.
```
sudo docker build -t frontend .
``` 
List the docker images to confirm it is built
```
sudo docker images
```
To run `frontend` docker images we have to expose internal port to external port in order to access it on the host machine. I'll use 8081 for both, Docker containter and Host machine. If you want to give `PORT` `-e PORT=*YOURPORT*`. We need to call DNS `backend` generated by `DOCKER CONTAINTER` we will pass in the DNS `-e IP=backend`. We need to link our `frontend` containter to `backend` containter, we will use `--link backend:backend`. We will also give our conatainer the name `frontend` to make our reference from `frontend` easier. Add `-d` if you want the container to run in background
```
sudo docker run -d -e IP=backend -p 8081:8081 --name frontend --link backend:backend frontend
```
If publishes its result also on localhost. You can access the container now by running entering `localhost:8081` in browser or `curl http://localhost:8081` on your terminal. If no `NAME` variable is given. The response of frontend will be:
```
16/05/2022 00:06 Hello Stakater
```
## Running on Kubernetes with MINIKUBE
Make sure your have installed `kubectl` to use kubernetes with `MINIKUBE`. Make sure you have configured and `MINIKUBE` is running in your virtual enviroment. You can use the following link to install `kubectl` `https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/` and to install `MINIKUBE` `https://minikube.sigs.k8s.io/docs/start/`.
If you are running ubuntu you can use my steps to install. Make sure you have installed `Virtual Box` on your ubuntu machine.
```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
kubectl version
kubectl cluster-info
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
minikube config set driver virtualbox
minikube start --driver=virtualbox
minikube status
```
My docker images have been uploaded on the `Dockerhub`. The name of frontend image is `crazyfordevops/frontend-vFinal`, the deployment will pull the images directly. To work for kubernetes use the directory:
```
cd kuberenetes
```
We have to run `Two` items in total for docker deployment. `frontend-service.yaml` and `frontend-deploy.yaml`. The frontend service is Nodeport and exposes external ip of 30081 to the ip extracted from minikube. To deploy frontend and service do following:
```
kubectl create -f frontend-service.yaml
kubectl create -f frontend-deploy.yaml
```
To check the status of service and deployment do the following:
```
kubectl get svc,deployment
```
The `READY` option should show `1/1` since we are using only `1` replica it will create only `1 POD`.
Get the URL to access the deployment by the following:
```
minikube service frontend --url
```
You can input the `*YOUR MINIKUBE IP*:30081` in browser or you can `curl http:\\*YOUR MINIKUBE IP*:30081`


##                                                         ***THE FRONTEND END***
