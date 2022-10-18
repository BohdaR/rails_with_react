FROM ruby:3.1.2

RUN apt-get update -qq && apt-get install -y nodejs npm
WORKDIR /App
COPY Gemfile /App/Gemfile
COPY Gemfile.lock /App/Gemfile.lock
RUN bundle install
RUN npm install --global yarn

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
