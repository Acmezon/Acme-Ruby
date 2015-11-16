# firstApp.rb
require 'sinatra'
require 'json'
require 'mongoid'

Mongoid.load!("mongoid.yml")
set :public_folder, 'public'

class Contact
	include Mongoid::Document
	field :name, type: String
	field :email, type: String
	field :number, type: String
end

before do 
	#headers 'Access-Control-Allow-Origin' => '*'
	headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
	headers['Access-Control-Allow-Origin'] = 'http://localhost:4567'
	headers['Access-Control-Allow-Headers'] = 'accept, authorization, origin'
end

get '/' do
	send_file File.expand_path('index.html', settings.public_folder)
end

get '/contacts' do
	Contact.all.to_json
end

post '/contacts' do
	content_type :json
	headers 'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
		'Access-Control-Allow-Headers' => 'Content-Type'

	begin
		params.merge! JSON.parse(request.env["rack.input"].read)
	rescue JSON::ParserError
		logger.error "Cannot parse request body." 
	end

	Contact.create(
		name: params[:name],
		email: params[:email],
		number: params[:number]
	)
end

delete '/contacts/:id' do
	id = params[:id]
	Contact.where(_id: id).delete
	status 200
end

not_found do
	({error: 'Not found'}).to_json
end