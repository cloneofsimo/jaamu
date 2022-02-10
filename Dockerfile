FROM amazon/aws-lambda-python:3.8

WORKDIR /var/task
COPY . .
RUN pip install -r requirements.txt

RUN yum update -y
RUN yum install -y gcc-c++ make curl
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install nodejs npm -y
RUN npm install

# lambda_function.handler 실행
CMD ["lambda_function.handler"]
