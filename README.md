# Udacity Project 5 - NEIGHBOURHOOD MAP

For the Udacity Project 5 we needed to make a Google map based full screen neigbourhood map 

##FIRE UP THE PUPPY
To get started and see it work you can open the index.html file in the browser. Thats it!


##DEVELOPMENT
To get the build running your changes open the root folder in the console and add the following command. Don't forget to refresh the browser when changing stuff. 
```
grunt watch

```
What does this command do?

1. it checks if there are any changes in the sass files
2. if there are changes then it will compile to css
3. Check for changes in the css, if so minify in the public folder
4. check if there are any changes in the .js files in the assets folder, if so minify and bundle the files in the right order. 
#Installing modules
Use bower to install modules or node
```
bower install 'module' --save
```
This will put it in the /bower_components/ folder

when a new module is installed use grunt-wiredep to put it in the sourcefile
run:
```
grunt wiredep
```


