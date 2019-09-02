function getFakeCaptcha(req, res) {
    return res.json('captcha-xxx');
  }
  
  export default {
    'POST  /api/login': (req, res) => {
      const { password, userName, type } = req.body;
      if (password === '1234' && userName === 'admin') {
        res.send({
          success: true,
          type,
          currentAuthority: 'admin',
          data:{
              user:{
                email: "610986797@qq.com",
                mobile: "17600189468",
                password: "1234",
                username: "admin",
              },
              permissions:["scenario:view", "scenario:sort", "dept:add"],
              token:Math.random()
          }
        });
        return;
      }
  
      if (password === 'ant.design' && userName === 'user') {
        res.send({
          success: true,
          type,
          currentAuthority: 'user',
        });
        return;
      }
  
      res.send({
        success: false,
        type,
        currentAuthority: 'guest',
      });
    },
    'GET  /api/login/captcha': getFakeCaptcha,


    'GET /api/menu/:username':(req,res) =>{
      const {username} = req.json(username);
      if(username === 'admin') {
        res.send({
            success: true,
            username:username
          });
      }       
    }
  };
  