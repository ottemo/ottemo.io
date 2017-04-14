#!/bin/bash

# build and push ottemo-io image to registry

for i in "$@"
do
case $i in
    version=*)
    version="${i#*=}"
    shift
    ;;
    push=*)
    push="${i#*=}"
    shift
    ;;
    deploy=*)
    deploy="${i#*=}"
    shift
    ;;
    *)
            # unknown option
    ;;
esac
done

kubernetes_service='ottemo-io'
push="${push:-true}"
deploy="${deploy:-false}"

MYDIR=$(cd `dirname ${BASH_SOURCE[0]}` && pwd)
REPO="$MYDIR/.."
cd $REPO

if ! [ -n "$version" ] ; then
  date=$(date +%Y%m%d-%H%M%S)
  IMAGE="gcr.io/ottemo-kube/ottemo-io:${date}"
else
  IMAGE="gcr.io/ottemo-kube/ottemo-io:$version"
fi
echo "use $IMAGE as image name"

echo "build alpine based ottemo-io container"
docker build -t $IMAGE .
if [ $? -ne 0 ]; then
  echo "error in build ottemo-io alpine based container"
  exit 2
fi

if [ "$push" == "true" ] || [ "$deploy" == "true" ]; then
  gcloud docker -- push $IMAGE
  if [ $? -ne 0 ]; then
    echo "error in push image"
    exit 2
  fi
fi

if [ "$deploy" == "true" ]; then
  kubectl rolling-update $kubernetes_service --image=$IMAGE
  if [ $? -ne 0 ]; then
    echo "error in rolling update $kubernetes_service to $IMAGE"
    exit 2
  fi
fi
