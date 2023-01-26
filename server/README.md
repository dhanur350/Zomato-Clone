# Initial SetUp

https://github.com/rohan1917/zomato-clone

git clone https://github.com/rohan1917/zomato-clone
cd zomato-clone
mkdir server
cd server
npm i


<!-- dependencies -->
npm install express mongoose dotenv

<!-- dev dependencies -->
npm i --save-dev nodemon @babel/cli, @babel/core and @babel/preset-env @babel/node

# API Planning
- Food (Food items & their details)
- Resturant (Resturant & their details)
- Menu (Menu & their details)
- Order (Order & their details)
- Image (Stroing all the imgs related to the zomato)
- Review (Storing all the list of reviews)
- User (User realted details, username, email n password)



jwt => JsonWebToken
Session Based Appln 
        >> tokens
        >> For the 1st time when we visit the appln we login or create a acc
                >> at this pt of time -> a new JWT token will be generated
                >> and if we revisit the appln after 1 day || 10 day ||10 months .. we don't need to pass the credentials
                        instead while making a req the generated JWT token ill be sent to the server
                 >> JWT will be stored in client or endusers browser (Cookise, localstorage)     

                 >> JWT also has expiration it depends on business perspective (1 day | 10 day || 10 years)  



hash & salting

devtown123$ => hash() => @edrtmkbka$3372y* => salt(5) => hhoabkan@$%$3u1nknk11j