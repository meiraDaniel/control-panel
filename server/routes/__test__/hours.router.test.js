require('iconv-lite').encodingExists('foo')

const router = require('../hours.routes')



const {
    validadeTruthiness,
    validateControllerUsed,
    validateMatchingStringValues,
  } = require("../../testUtils/validators");


      describe('should validate the hours routes',()=>{
        const routerArr = router.stack
    
        test('should  the insert router',()=>{
            validadeTruthiness(routerArr[0].route.methods.post);
            validateMatchingStringValues(routerArr[0].route.path, "/myhours/insert");
        })
        test('should  the edit router',()=>{
          validadeTruthiness(routerArr[1].route.methods.put);
          validateMatchingStringValues(routerArr[1].route.path, "/myhours/edit");
      })
      test('should  the display router',()=>{
        validadeTruthiness(routerArr[0].route.methods.post);
        validateMatchingStringValues(routerArr[2].route.path, "/myhours?");
    })
   
      })
 