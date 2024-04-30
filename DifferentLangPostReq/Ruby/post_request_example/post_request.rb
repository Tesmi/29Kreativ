require 'net/http'
require 'uri'

url = URI.parse('https://dev.29kreativ.com/recruitment/levels/')

code = "8fc95a69adbc08a22bb90e19e66b389d"

body = "name=Tushar&code=#{code}"

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true if url.scheme == 'https'

headers = {
  'Content-Type' => 'application/x-www-form-urlencoded', 
  'Authorization' => "Bearer #{code}"
}

request = Net::HTTP::Post.new(url.path, headers)
request.body = body

response = http.request(request)

puts "Response code: #{response.code}"
puts "Response body: #{response.body}"
