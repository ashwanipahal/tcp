FROM centos:7.6.1810

RUN curl --silent --location https://rpm.nodesource.com/setup_12.x | bash -  && \
	curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
	yum -y install yarn && \
	mkdir /src
COPY . /src
EXPOSE 8081
WORKDIR /src/packages/web
CMD [ "yarn","next-start"]
	