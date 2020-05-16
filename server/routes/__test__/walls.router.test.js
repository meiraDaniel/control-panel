require('iconv-lite').encodingExists('foo')

const router = require('../walls.routes')



const {
    validadeTruthiness,
    validateControllerUsed,
    validateMatchingStringValues,
  } = require("../../testUtils/validators");


      describe('should validate the walls routes',()=>{
        const routerArr = router.stack
    
        test('should  the create post router',()=>{
            validadeTruthiness(routerArr[0].route.methods.post);
            validateMatchingStringValues(routerArr[0].route.path, "/wall/post");
        })
        test('should  the display router',()=>{
          validadeTruthiness(routerArr[1].route.methods.get);
          validateMatchingStringValues(routerArr[1].route.path, "/wall");
      })
     
   
      })
 