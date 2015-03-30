# brei-pattern-library
An importable pattern library for Barkley REI static coding.

### Pattern Submissions Are Welcome!
To submit a pattern:
```bash
git clone https://github.com/JDillon522/brei-pattern-library.git
```
(Until its ready for prime time, it'll live on my repo. Then this will change from jdillon522 to BarkleyREI)

Then `cd brei-pattern-library`.

If you want to add a pattern, say, a new module, do the following:
- Make a new directory with the module name in the module's directory
 ```bash
 cd modules
 mkdir awesome-new-module
 ```
 - Then create two new files: `_awesome-new-module.hbs` and `_awesome-new-module.scss`.
  - **Remember**: Module names are precedded by "_" for both the .hbs and .scss files.
  - Template and partial names are not.
  - For now...
 - Then just add all the necessary markup and styles!
 - You can add any .js files as well, but the generator isnt ready for that yet. 
