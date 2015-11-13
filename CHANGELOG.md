1.1.2 / 2015-11-14
==================
  * Added npmignore

1.1.1 / 2014-07-12
==================
  * Misnamed keys in documentation

1.1.0 / 2014-07-12
==================
  * Third input changed - is now an object of optionals:
    - `label`: function producing string from obj (old nameFn - old 3rd arg)
    - `filter`: function returning bool from obj (old filterFn - old 4th arg)
    - `sort`: boolean for whether to sort 'recurseName' by `label` lexicographically

1.0.1 / 2014-07-11
==================
  * Fix turnChar bug introduced in rewrite

1.0.0 / 2014-07-11
==================
  * Rewritten to recurse into an array rather an object - see readme
  * Now throws when given a recurse key not present on root
  * Test coverage and documentation improvements

0.0.2 / 2012-10-20
==================
  * Docmuntation maintenance

0.0.1 / 2012-01-28
==================
  * First release
