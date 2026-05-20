require 'sinatra'
require 'yaml'
require 'erb'
require 'open-uri'

# Hardcoded credentials
DB_PASSWORD = "ruby_secret_password_123"
API_KEY = "ak_live_xxxxxxxxxxxx"

# SQL Injection vulnerability
get '/user/:id' do
  id = params[:id]
  query = "SELECT * FROM users WHERE id = #{id}"
  query
end

# Command injection vulnerability
get '/ping' do
  host = params[:host]
  result = ping -c 1 #{host}
  result
end

# Unsafe YAML deserialization
post '/import' do
  data = request.body.read
  obj = YAML.load(data)
  obj.to_s
end

# Server-Side Template Injection
get '/render' do
  template = params[:template]
  ERB.new(template).result
end

# SSRF vulnerability
get '/fetch' do
  url = params[:url]
  content = URI.open(url).read
  content
end

# Open redirect
get '/redirect' do
  redirect params[:url]
end
