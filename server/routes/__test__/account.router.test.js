require('iconv-lite').encodingExists('foo')

const router = require('../account.routes')



const {
    validadeTruthiness,
    validateControllerUsed,
    validateMatchingStringValues,
  } = require("../../testUtils/validators");


      describe('should validate the account routes',()=>{
        const routerArr = router.stack
    
        test('should  the register router',()=>{
            validadeTruthiness(routerArr[0].route.methods.post);
            validateMatchingStringValues(routerArr[0].route.path, "/register");
        })
        test('should  the login router',()=>{
          validadeTruthiness(routerArr[1].route.methods.post);
          validateMatchingStringValues(routerArr[1].route.path, "/login");
      })
      test('should  the edit router',()=>{
        validadeTruthiness(routerArr[0].route.methods.post);
        validateMatchingStringValues(routerArr[2].route.path, "/settings");
    })
   
      })
 