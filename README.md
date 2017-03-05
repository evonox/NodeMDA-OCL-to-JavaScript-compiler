# OCL Compiler to Javascript for NodeMDA

This project has been currently created and is still under construction.

## Introduction
This project is a Node package that implements **OCL Compiler** generating code into JavaScript. **OCL** acronym 
stands for **Object Constraint Language** which is a query language used to impose constraints on UML model
elements. The purpose of this package is to generate code into JavasScript to ensure that the constraints, which were modeled in a UML diagram, are fulfilled at runtime.

This package is not meant for a stand-alone use because it is tightly binded to the 
[**NodeMDA**](https://www.npmjs.com/package/nodemda) code-generation engine developed by Joel Kozikowski.

## Installation
First you need to install **NodeMDA** code-generation engine. The process is well-described at 
[**NodeMDA NPM page**](https://www.npmjs.com/package/nodemda).

**_Command line_**
```
npm install -g nodemda-ocl-to-js
```

## Usage
At first, you need to setup a project as it is again described at [**NodeMDA NPM page**](https://www.npmjs.com/package/nodemda).

Then create some files with *ocl* extension inside the project directory. You can structure you **OCL files**
into subdirectories as you wish, the OCL compiler will find them.

**_Then run command:_**
```
nodemda gen --platform ocl-to-js
```

