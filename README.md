# CompareJSON

A command line program to compare two json files for a similarity rating. Built in NodeJs.

## Assumptions

- Our base assumption is that the top level keys of our JSON objects are priority information. They highlight the type of information being stored and so our overall score must be weighed by the amount of top level keys in our largest key-value object. The weight of every sub-object key must then be a fraction of one parent-object's unit score, and so on, for every successive object or array that is embedded in the children properties.

- Another assumption is that this equality check is based on similarities so it doesn't matter which object we choose to make our base reference, so long as the total possible points is picked from the largest object's key count.

## Improvements / Considerations

A reasonable assumption is that any array/subarrays comparison could be contrasted by a primary/identifying key. This makes it possible to evaluate comparisons regardless of element position order. This assumption is justifiable by the context of objects representing something meaningful. In this case an additional assumption is that all structured objects will have their identifier key as the first key-value pair. An alternative solution to make the algorithm primary-key-agnostic would be to store a confidence map for each observed array element, compared against the non-ordered target array element, storing the maximum percentage score quasi-quadratically, and removing, or popping the high-degree matches from the observed and target array iteratively.

## Instruction

Clone this repository, navigate to project directory and execute command `npm i`

To run the program use the command `node main.js path1 path2` where path1 and 2 are the JSON file directory paths anywhere in your file system. Sample files already exist in this repository under the `./quiq_sample_json_files` directory.

i.e. `node main.js quiq_sample_json_files/BreweriesMaster.json quiq_sample_json_files/BreweriesSample2.json`

To perform an analysis of all files in a directory, use the command `node main.js directoryPath` or `node main.js quiq_sample_json_files`
