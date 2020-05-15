require('iconv-lite').encodingExists('foo')

const router = require('../todos.routes')



const {
    validadeTruthiness,
    validateControllerUsed,
    validateMatchingStringValues,
  } = require("../../testUtils/validators");


      describe('should validate the todos routes',()=>{
        const routerArr = router.stack
    
        test('should  the displayTask router',()=>{
            validadeTruthiness(routerArr[0].route.methods.get);
            validateMatchingStringValues(routerArr[0].route.path, "/todo?");
        })
        test('should  the creatTask router',()=>{
          validadeTruthiness(routerArr[1].route.methods.post);
          validateMatchingStringValues(routerArr[1].route.path, "/todo/post");
      })

       test('should  the deleteTask router',()=>{
          validadeTruthiness(routerArr[2].route.methods.delete);
          validateMatchingStringValues(routerArr[2].route.path, "/todos/delete");
      })
     
   
      })
 