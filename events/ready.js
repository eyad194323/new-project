/*
var _0x57eb=["\x64\x69\x73\x63\x6F\x72\x64\x2E\x6A\x73","\x65\x78\x70\x6F\x72\x74\x73","\x43\x6C\x69\x65\x6E\x74\x52\x65\x61\x64\x79","\x6F\x6E\x6C\x69\x6E\x65","\x73\x65\x74\x53\x74\x61\x74\x75\x73","\x75\x73\x65\x72","\x52\x65\x61\x64\x79\x21\x20\x4C\x6F\x67\x67\x65\x64\x20\x69\x6E\x20\x61\x73\x20","\x74\x61\x67","\x20\x2C\x20\x4D\x79\x20\x49\x44\x20\x3A\x20","\x69\x64","","\x6C\x6F\x67","\x44\x65\x76\x65\x6C\x6F\x70\x65\x64\x20\x62\x79\x20\x69\x69\x4D\x68\x6D\x64\x23\x39\x37\x30\x35","\x49\x44\x20\x3A\x20\x37\x34\x37\x30\x39\x31\x36\x34\x34\x35\x33\x36\x33\x32\x34\x31\x31\x37","\x6C\x65\x6E\x67\x74\x68","\x4C\x69\x73\x74\x65\x6E\x69\x6E\x67","\x73\x65\x74\x41\x63\x74\x69\x76\x69\x74\x79"];
const {Events,ActivityType}=require(_0x57eb[0]);
module[_0x57eb[1]]= {name:Events[_0x57eb[2]],once:true,execute:function(_0x9222x1)
{
	_0x9222x1[_0x57eb[5]][_0x57eb[4]](_0x57eb[3]);console[_0x57eb[11]](`${_0x57eb[6]}${_0x9222x1[_0x57eb[5]][_0x57eb[7]]}${_0x57eb[8]}${_0x9222x1[_0x57eb[5]][_0x57eb[9]]}${_0x57eb[10]}`);let _0x9222x2=[`${_0x57eb[12]}`,`${_0x57eb[13]}`],_0x9222x3=0;
	setInterval(()=>
	{
		return _0x9222x1[_0x57eb[5]][_0x57eb[16]]({name:`${_0x57eb[10]}${_0x9222x2[_0x9222x3++ % _0x9222x2[_0x57eb[14]]]}${_0x57eb[10]}`,type:ActivityType[_0x57eb[15]]})
	}
	,5000)
}
}  
*/

const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
      client.user.setStatus("idle")
        client.user.setActivity(`Alx S`, { type: ActivityType.Listening })
    }
};
    