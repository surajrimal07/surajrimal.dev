if(!self.define){let e,a={};const i=(i,s)=>(i=new URL(i+".js",s).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let r={};const n=e=>i(e,t),o={module:{uri:t},exports:r,require:n};a[t]=Promise.all(s.map((e=>o[e]||n(e)))).then((e=>(c(...e),r)))}}define(["./workbox-4a6e5f9b"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/W1NVq8e0qVHMVU8RQuBkW/_buildManifest.js",revision:"6368ced407aa808ae2a6dc2b463e64db"},{url:"/_next/static/W1NVq8e0qVHMVU8RQuBkW/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/081ca426-e5e0b54553560a8b.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/0e5ce63c-75bd2611838f0a7f.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/0e762574-e28096ac3a2546b5.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/1-b2565f0fd040c04c.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/1573-a9ed4a4129840e40.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/1631-69ca0690af46a25a.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/221e729c-e2a19cf1eb63e39e.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/2250-dd21824966e04173.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/242-e3f7d0e0d4e6d6c6.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/2465-3ccdb0eaf4d91bd7.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/30a37ab2.d309926d7f9d01e0.js",revision:"d309926d7f9d01e0"},{url:"/_next/static/chunks/3270-a4188ac2a1c2a1a7.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/3515-3f2e634881380ef4.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/3674-f2858954c471524f.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/3697-87a647a5dfe1f066.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/370b0802.62d48ddd539b7ac0.js",revision:"62d48ddd539b7ac0"},{url:"/_next/static/chunks/3717-49da539df446b114.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/3743-7651c486fbb5caef.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/3765-92e68ec6806c6ddb.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/3778-a9b9a2ea8c49779b.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/3844-0479e83760d16a60.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/385cb88d.238b1939750c3c74.js",revision:"238b1939750c3c74"},{url:"/_next/static/chunks/3d47b92a-8ae5c64136ca712a.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/4149-7a75e9affd0b7f82.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/4502-49c85e7a518d2376.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/4632-536cfc38c95f80ac.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/4640-b9dab78bc21b9f81.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/479ba886.d5c9b83f1f64595a.js",revision:"d5c9b83f1f64595a"},{url:"/_next/static/chunks/4934-092c14406e74115d.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/4947-a8a31fa09ac366c0.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/4bd1b696-5adc428a82e35453.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/5091-d71f73e566993271.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/5203.12bf63b948426935.js",revision:"12bf63b948426935"},{url:"/_next/static/chunks/5352-70c87b0f24cf052c.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/53c13509-2daa1b71f470ab6a.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/578c2090.581b087d447dfe3a.js",revision:"581b087d447dfe3a"},{url:"/_next/static/chunks/59650de3-b29b1396e0b70e96.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/597-532cb7a4018b24f5.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/5e22fd23-5ea07248453fd01b.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/6094-0522488862451710.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/6142-8e67dad946e19f32.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/6218.d664568b2f884cfc.js",revision:"d664568b2f884cfc"},{url:"/_next/static/chunks/6219-264a8d5a24576a44.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/6375-c1c8291ffe0b17bb.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/6429-f19a45c494956933.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/659-87be2c9f3af2cbfb.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/6592-9eca376eeba725e1.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/66ec4792-71454bf7dc1874fc.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/6735.dce668de27a428b7.js",revision:"dce668de27a428b7"},{url:"/_next/static/chunks/7136-4829a2d2bf8450b6.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/7204-56106d9738044695.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/7208-1ca373c676751802.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/7221-4910520f3544f20c.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/7701-8dce1b6cfc80e694.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/7882.507afcdf2ff7409f.js",revision:"507afcdf2ff7409f"},{url:"/_next/static/chunks/795d4814-9186a30e00e501f6.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/7970-f7eccfd1b6630364.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/8173-876f32fe77cc47ea.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/8541-d4f4e6268e6f2664.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/899.67b97b6000dace4e.js",revision:"67b97b6000dace4e"},{url:"/_next/static/chunks/8e1d74a4-fe883fb4724a6d85.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/905-cd8032045b03a208.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/909-7f15b5f592a74073.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/9289-d8176515ac5713a1.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/9316e0b3-3f2453f1c990859a.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/94730671.24eecc26896d1131.js",revision:"24eecc26896d1131"},{url:"/_next/static/chunks/9878-29ddbc006462ef9a.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/aaea2bcf-f8ce6f5ca1a9cb5f.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(chat)/chat/page-d069d670394644f5.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(chat)/conversations/%5BconversationId%5D/loading-3038802f06c272d3.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(chat)/conversations/%5BconversationId%5D/not-found-1e77aa0beb91b00e.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(chat)/conversations/%5BconversationId%5D/page-128d3250e5431acf.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(chat)/conversations/layout-ef4d6c68a4057f32.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(chat)/conversations/page-5fdabd2f5137f1a9.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(chat)/layout-095b32bb445d737d.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/about/layout-09b70b74f50427f4.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/about/page-0633262a611a0abb.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/about/edit/page-9d63369961f467b7.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/about/page-2be3aa79c57fe9ca.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/available/page-d1a10ad8a8ced6e9.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/blog/%5B...slug%5D/page-47e1c3e72bf021b2.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/blog/page-db683db7291ee351.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/certifications/%5Bid%5D/page-65a14f024eb34935.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/certifications/page-0cbb0bf5966f736b.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/chat/page-38fda23c3bcbd719.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/contact/page-3b01f2e1fbb1f05f.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/journey/page-3ee40f60e732548c.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/media/%5Bid%5D/page-476aa7d21f207285.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/media/page-755228e2cfb06bce.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/page-ee9d07ae60558caf.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/project/%5B...id%5D/page-c9bcdb74bbc1f3f4.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/project/page-88c9e584c2c96b91.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/resume/edit/page-b694108004b0595b.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/resume/page-1774e1874e32ee5c.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/snippets/%5B...slug%5D/page-c812e7b2fbc609a4.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/snippets/page-2b6eba57b09fd6f1.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/uses/edit/page-c21f9656f9ac6e3b.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/admin/uses/page-2382eeeb7b7b1e92.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/api/about/route-99a6c4e5e28b8f3a.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/api/contact/route-1e4841f0c030f1a8.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/api/cookies/route-9f94d31c7e6d1e78.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/api/logincount/route-0fa945666f869f2d.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/api/posts/route-73929b19a401eac8.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/api/weather/route-5f13ae2a7d709096.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/auth/callback/route-11707294ef8d9612.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/auth/confirm/route-5ffe66cc1fddd9b9.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/auth/layout-b25bae27b5b3a362.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/auth/magiclink/page-94cfd7269f482f64.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/auth/page-48ffa1f81acb76b7.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/available/layout-ef6d2dd17557f456.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/available/page-114863d59f4feda9.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/blog/%5B...slug%5D/page-4b8508f69114919f.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/blog/layout-06e696e30ea69d01.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/blog/page-1af278d1f3ad53bf.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/blog/page/%5Bpage%5D/page-aa04ddeff26db724.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/certificates/layout-09bc30c2c03cd54c.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/certificates/page-8f3ea18c664a6178.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/contact/layout-1f875450c6a4bd04.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/contact/page-878decab926b093f.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/guestbook/layout-5fbbedc9d6766e54.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/guestbook/page-dc00a67991eadd97.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/journey/layout-9b174ff370a907a7.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/journey/page-dd3b1f81faa999ae.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/layout-e804ee3296a48699.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/loading-0eef7d9a4ec904e8.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/media/layout-25fd022ba8bd5772.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/media/page-997c3addc0ad77f4.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/not-found-40a13dcf591415c5.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/page-2fc9e0e07ba800b6.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/papers/%5Bid%5D/page-2231231129f895a3.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/papers/page-1eaea706cfe5b141.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/privacy/layout-78d46cce2f63366d.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/privacy/page-1bf057ea41de4ed0.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/profile/page-3671227413268573.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/projects/layout-54f58a5392ec1617.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/projects/page-8a88c81d1ad491cb.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/resume/layout-655500a05cd33900.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/resume/page-7fbedc564454d9fe.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/snippets/%5B...slug%5D/page-4aa4a98579a56649.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/snippets/layout-7dbb843b1a534b18.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/snippets/page-4b3ee875fac57793.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/tags/%5Btag%5D/page-55a7c03185d5b51f.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/tags/layout-5e52365dfcf18160.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/tags/page-58c4d003196337a9.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/terms/layout-88fef78f1c1ae4a8.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/terms/page-8eb6ba3b23a114ac.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/tmsextension/page-05257e52dd7a4def.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/tmsextension/privacy/page-99f715a681652826.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/tmsextension/terms/page-970315753503bce5.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/unauthorized/layout-5be856a3ba7a9aa7.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/unauthorized/page-379bf17921741ef9.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/uses/layout-152175c468785e9d.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/(root)/uses/page-41de3668ce13134a.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/_not-found/page-ad8fd68ad6349cf0.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/error-fbd74a537f35a13c.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/app/global-error-e16f90ebcce09aed.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/b563f954-1d57a7812c40ff39.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/e58627ac-8309e1c2cb934132.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/ee560e2c-ce9c905b5ea3ece6.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/f25cdb8d.8ba07f3083e33145.js",revision:"8ba07f3083e33145"},{url:"/_next/static/chunks/f8025e75.dae8d91404b3838a.js",revision:"dae8d91404b3838a"},{url:"/_next/static/chunks/f97e080b-b8e2a4b9f2228560.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/framework-c8065bab8b311d0e.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/main-app-acfbfc95c86e5a58.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/main-f8e4f6b1d3b908b5.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/pages/_app-0cdc5a2e542619de.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/pages/_error-fb2ea5c1aefa1dc8.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-f623a6bac573e8b6.js",revision:"W1NVq8e0qVHMVU8RQuBkW"},{url:"/_next/static/css/14ebd4795fd9a855.css",revision:"14ebd4795fd9a855"},{url:"/_next/static/css/8d51377b0fe8c3c3.css",revision:"8d51377b0fe8c3c3"},{url:"/_next/static/css/a9d62ab89e6347dd.css",revision:"a9d62ab89e6347dd"},{url:"/_next/static/css/b3a9976d7df91d95.css",revision:"b3a9976d7df91d95"},{url:"/_next/static/css/c02db8550d2e15c6.css",revision:"c02db8550d2e15c6"},{url:"/_next/static/css/cdb3b930e021f658.css",revision:"cdb3b930e021f658"},{url:"/_next/static/css/f2b3a74181a8f4a2.css",revision:"f2b3a74181a8f4a2"},{url:"/_next/static/media/2d141e1a38819612-s.p.woff2",revision:"acb6ad8efbc88ce55fcc0639a5d0a211"},{url:"/_next/static/media/62328fecf9e80426-s.woff2",revision:"138c8f78129c50d2783bf0fe261d32af"},{url:"/_next/static/media/90475aac776488b6-s.p.woff2",revision:"183db31d6365283bef4914042be9dfab"},{url:"/_next/static/media/KaTeX_AMS-Regular.1608a09b.woff",revision:"1608a09b"},{url:"/_next/static/media/KaTeX_AMS-Regular.4aafdb68.ttf",revision:"4aafdb68"},{url:"/_next/static/media/KaTeX_AMS-Regular.a79f1c31.woff2",revision:"a79f1c31"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.b6770918.woff",revision:"b6770918"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.cce5b8ec.ttf",revision:"cce5b8ec"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.ec17d132.woff2",revision:"ec17d132"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.07ef19e7.ttf",revision:"07ef19e7"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.55fac258.woff2",revision:"55fac258"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.dad44a7f.woff",revision:"dad44a7f"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.9f256b85.woff",revision:"9f256b85"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.b18f59e1.ttf",revision:"b18f59e1"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.d42a5579.woff2",revision:"d42a5579"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.7c187121.woff",revision:"7c187121"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.d3c882a6.woff2",revision:"d3c882a6"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.ed38e79f.ttf",revision:"ed38e79f"},{url:"/_next/static/media/KaTeX_Main-Bold.b74a1a8b.ttf",revision:"b74a1a8b"},{url:"/_next/static/media/KaTeX_Main-Bold.c3fb5ac2.woff2",revision:"c3fb5ac2"},{url:"/_next/static/media/KaTeX_Main-Bold.d181c465.woff",revision:"d181c465"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.6f2bb1df.woff2",revision:"6f2bb1df"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.70d8b0a5.ttf",revision:"70d8b0a5"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.e3f82f9d.woff",revision:"e3f82f9d"},{url:"/_next/static/media/KaTeX_Main-Italic.47373d1e.ttf",revision:"47373d1e"},{url:"/_next/static/media/KaTeX_Main-Italic.8916142b.woff2",revision:"8916142b"},{url:"/_next/static/media/KaTeX_Main-Italic.9024d815.woff",revision:"9024d815"},{url:"/_next/static/media/KaTeX_Main-Regular.0462f03b.woff2",revision:"0462f03b"},{url:"/_next/static/media/KaTeX_Main-Regular.7f51fe03.woff",revision:"7f51fe03"},{url:"/_next/static/media/KaTeX_Main-Regular.b7f8fe9b.ttf",revision:"b7f8fe9b"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.572d331f.woff2",revision:"572d331f"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.a879cf83.ttf",revision:"a879cf83"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.f1035d8d.woff",revision:"f1035d8d"},{url:"/_next/static/media/KaTeX_Math-Italic.5295ba48.woff",revision:"5295ba48"},{url:"/_next/static/media/KaTeX_Math-Italic.939bc644.ttf",revision:"939bc644"},{url:"/_next/static/media/KaTeX_Math-Italic.f28c23ac.woff2",revision:"f28c23ac"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.8c5b5494.woff2",revision:"8c5b5494"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.94e1e8dc.ttf",revision:"94e1e8dc"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.bf59d231.woff",revision:"bf59d231"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.3b1e59b3.woff2",revision:"3b1e59b3"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.7c9bc82b.woff",revision:"7c9bc82b"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.b4c20c84.ttf",revision:"b4c20c84"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.74048478.woff",revision:"74048478"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.ba21ed5f.woff2",revision:"ba21ed5f"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.d4d7ba48.ttf",revision:"d4d7ba48"},{url:"/_next/static/media/KaTeX_Script-Regular.03e9641d.woff2",revision:"03e9641d"},{url:"/_next/static/media/KaTeX_Script-Regular.07505710.woff",revision:"07505710"},{url:"/_next/static/media/KaTeX_Script-Regular.fe9cbbe1.ttf",revision:"fe9cbbe1"},{url:"/_next/static/media/KaTeX_Size1-Regular.e1e279cb.woff",revision:"e1e279cb"},{url:"/_next/static/media/KaTeX_Size1-Regular.eae34984.woff2",revision:"eae34984"},{url:"/_next/static/media/KaTeX_Size1-Regular.fabc004a.ttf",revision:"fabc004a"},{url:"/_next/static/media/KaTeX_Size2-Regular.57727022.woff",revision:"57727022"},{url:"/_next/static/media/KaTeX_Size2-Regular.5916a24f.woff2",revision:"5916a24f"},{url:"/_next/static/media/KaTeX_Size2-Regular.d6b476ec.ttf",revision:"d6b476ec"},{url:"/_next/static/media/KaTeX_Size3-Regular.9acaf01c.woff",revision:"9acaf01c"},{url:"/_next/static/media/KaTeX_Size3-Regular.a144ef58.ttf",revision:"a144ef58"},{url:"/_next/static/media/KaTeX_Size3-Regular.b4230e7e.woff2",revision:"b4230e7e"},{url:"/_next/static/media/KaTeX_Size4-Regular.10d95fd3.woff2",revision:"10d95fd3"},{url:"/_next/static/media/KaTeX_Size4-Regular.7a996c9d.woff",revision:"7a996c9d"},{url:"/_next/static/media/KaTeX_Size4-Regular.fbccdabe.ttf",revision:"fbccdabe"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.6258592b.woff",revision:"6258592b"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.a8709e36.woff2",revision:"a8709e36"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.d97aaf4a.ttf",revision:"d97aaf4a"},{url:"/_next/static/media/c7eb187887c48af6-s.woff2",revision:"361fa9642b5371651338f1af9f725f7e"},{url:"/_next/static/media/e11418ac562b8ac1-s.p.woff2",revision:"0e46e732cced180e3a2c7285100f27d4"},{url:"/contributions/badges/30_days.svg",revision:"195ef0f231b3a8f6ce325ff5faa60525"},{url:"/contributions/badges/all_time.svg",revision:"279549c1e70c6fc975e3de16ecbb56e5"},{url:"/contributions/badges/last_12_months.svg",revision:"ef34dfc546b652c17a237824adcf970d"},{url:"/contributions/badges/today.svg",revision:"41a3e1507eef09c69cedc5011e428609"},{url:"/contributions/badges/week.svg",revision:"bd58bcb32b76c1b6bbcc6c2737600cd3"},{url:"/contributions/graph/contributions.png",revision:"c57c0c6d1fc58a8607649f9e3b0be0d2"},{url:"/contributions/graph/contributions.svg",revision:"ce4cc0793e57e47ca2ec364fe8f4bcd2"},{url:"/feed.xml",revision:"e3e24f10ebc3f22f79bda425f901e6e1"},{url:"/fonts/CalSans-SemiBold.woff2",revision:"183db31d6365283bef4914042be9dfab"},{url:"/image-cache/0049a55369a0c9f3b532d200b5e6b40f.svg",revision:"094aec29c55873f2b7a24df523b428c6"},{url:"/image-cache/0a315e967f7af5d0ded3858299923f6e.svg",revision:"aff6d39f4947f22f042e67ac21a9dc7a"},{url:"/image-cache/1d657e5fc08d7083a7002058e7ff3a2d.jpg",revision:"c988ecb3caab028823b3e0020a672019"},{url:"/image-cache/25fb18b21edb36b6b24cef276ee79830.svg",revision:"2eb6ca0fe3f48e16b1fe240735710094"},{url:"/image-cache/2db1b41ac9d41f7337cc0759f5d9f6c7.jpg",revision:"8c43cbbc092905bfa97e1bdf66de7511"},{url:"/image-cache/487634d34c90393a90e9ff2216c27030.svg",revision:"ece6283544a703f158b497507aae3b62"},{url:"/image-cache/559ef76c6c8d0b577764fc880ca479d5.svg",revision:"df7ba0f4020ca70048a0226d1dfa73f6"},{url:"/image-cache/596e813c8180726902dd8f8ae986943a.jpg",revision:"362275fd49769a0b753f0b6b39e75907"},{url:"/image-cache/5d63838e231e18bb853589798a9923e6.svg",revision:"1837c5719a977362642ffaf4990b6bac"},{url:"/image-cache/6fea07422e6585216bbc95e0f281d8f9.svg",revision:"28a6206f93399999d1a908d5c45232ad"},{url:"/image-cache/73866c743eefb2d5cc625c886c0aecba.svg",revision:"733a0db94b390b2fd5da87408285a079"},{url:"/image-cache/76636f855658ebccabac2446625f9bcc.jpg",revision:"68b4614bbd9dc3740f7da5d3d5c62e08"},{url:"/image-cache/815dc2835b0b6b04f43604188f6a0116.svg",revision:"8cd77280fc37422a25059d2d6dd59797"},{url:"/image-cache/8283bdfa851092755fd050bd7d2250e7.jpg",revision:"e2872d7c1967125b8492fdb6600c4a41"},{url:"/image-cache/82bad34c35545ec99c1613732c68e982.svg",revision:"5e2ea03aa4963cda5e91d395c2587e6b"},{url:"/image-cache/a0f68061de6361f2a7fdd6467d479449.svg",revision:"c873a3842e3c1c351f71a8e316da3836"},{url:"/image-cache/a1c343581615375649f718f96c1ecd53.svg",revision:"7d4bf2e92b2587e47b09997dbc654823"},{url:"/image-cache/b4e757eb5f6fd8f8d6bc4035c3ee73de.svg",revision:"748ff0e7b2f1f22adecad8463de25945"},{url:"/image-cache/b5d2070fa729f6704d8c4e0839653d32.jpg",revision:"fb903f59adf5ee1c3e7c5ed5a011b228"},{url:"/image-cache/f65238a4e32f180b4688d19d9b91628c.svg",revision:"67069a13e006345ce28ecc581f2ed162"},{url:"/search.json",revision:"2dbb4d6e0a0c8da9f2afb80f2a3b81a7"},{url:"/static/emojis/astonished-face-animated.png",revision:"4f0995770cab7e6b8e5b954bd1bb9289"},{url:"/static/emojis/astonished-face.png",revision:"16d333cc12c552c40e2384436f5007ba"},{url:"/static/emojis/clapping-hands-animated.png",revision:"708766c2547d3a58c59ef48c76f34bd4"},{url:"/static/emojis/clapping-hands.png",revision:"3f067be42ff32b0b658a282db608f65f"},{url:"/static/emojis/crying.png",revision:"62f01a3c50edf5b4207c0a9fb2978d99"},{url:"/static/emojis/crying.webp",revision:"2dc189d1eb16741c77db60d7ef60d6e5"},{url:"/static/emojis/face-with-monocle-animated.png",revision:"02a879faed5b385b1a4bdf2a6f4e51c8"},{url:"/static/emojis/face-with-monocle.png",revision:"f1b2cf7c42b8e7099d50b06291dc65f0"},{url:"/static/emojis/love-you-gesture.png",revision:"5dec5bc98805f6ce3c8ba5ae18a3623f"},{url:"/static/emojis/nerd-face.png",revision:"fb00fd3213ac48e360adf91122bba2c1"},{url:"/static/emojis/star-struck.png",revision:"cefb91eef4a7dd5a9c828960da3cd91b"},{url:"/static/emojis/waka.png",revision:"17ab4f79fe8701da6229c4864a174764"},{url:"/static/emojis/waka.webp",revision:"3096da597b2bf367bce5c466790d4d04"},{url:"/static/favicons/android-chrome-192x192.png",revision:"546aba3f6c86ade3eb1e8a9f19560744"},{url:"/static/favicons/android-chrome-512x512.png",revision:"0ac7ece6e932d3d9f89b67b8652f667f"},{url:"/static/favicons/apple-touch-icon.png",revision:"ba478f58b349f997270c2a7586ef242a"},{url:"/static/favicons/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/static/favicons/favicon-16x16.png",revision:"8d0064982822520f356020b931d8fd84"},{url:"/static/favicons/favicon-32x32.png",revision:"c0b2da09de2633379edb00ca5eab9aba"},{url:"/static/favicons/favicon.ico",revision:"67cc79da9f8d7157c5aeeac23da16171"},{url:"/static/favicons/mstile-150x150.png",revision:"509de0d954fc9a1610d7c417290bb338"},{url:"/static/favicons/site.webmanifest",revision:"24e84c69ccd6df80c04e139da7cae010"},{url:"/static/icons/bash.svg",revision:"dcfec5f738bca9ad76d00311eb62f5f7"},{url:"/static/icons/docker.svg",revision:"d3350e36da9130bc5d5e03dffd1df471"},{url:"/static/icons/git.svg",revision:"90d7f80a5a47cafe3d69a14a0cf0a32a"},{url:"/static/icons/github.svg",revision:"1ab6c421a39d477779799a2f91c66426"},{url:"/static/icons/javascript.svg",revision:"e2c3a9254eb683f370a26ca99fca7473"},{url:"/static/icons/liquid.svg",revision:"ea634fdb088e619c9213f079a61255f8"},{url:"/static/icons/markdown.svg",revision:"bc97fb06c2ed1810e9feb0cbfa9fc4db"},{url:"/static/icons/mongodb.svg",revision:"ce756188f8cec48ed678bf47355ccf48"},{url:"/static/icons/nestjs.svg",revision:"0d7c18b4da6c9dfcd09e293bfaaf420d"},{url:"/static/icons/nextjs.svg",revision:"2e0a41dca61e03438ef7eaa88da04fe6"},{url:"/static/icons/nodejs.svg",revision:"6b926e803890f0d6cab24b8fced72e98"},{url:"/static/icons/postgres.svg",revision:"242074c21b460dc13a6f95590ad679ba"},{url:"/static/icons/prisma.svg",revision:"30c0d65ce8ff3d622619e0a09bac7349"},{url:"/static/icons/railway.svg",revision:"2fb7407bda3164d84494572b2100cffc"},{url:"/static/icons/react.svg",revision:"70932e9ad27d0ce7803274891f2800c0"},{url:"/static/icons/remix.svg",revision:"5b40712cf552bd4330c75e1fa3dd61ee"},{url:"/static/icons/spotify.svg",revision:"830a2baee1674d4f03512ba6b6fb1b68"},{url:"/static/icons/supabase.svg",revision:"cbccd5b4d04f83bbe05936b6f62b6e2d"},{url:"/static/icons/tailwind.svg",revision:"c9f2ac5571568cc430ad774ddf96eff8"},{url:"/static/icons/typescript.svg",revision:"676a4e7b5a587db082bfb59f9dc66c9a"},{url:"/static/icons/umami.svg",revision:"94fea6b9633a6e74b8f50562523cfded"},{url:"/static/icons/vercel.svg",revision:"d698eb4bc1112d6f2c5b85c3797209b0"},{url:"/static/icons/x.svg",revision:"59261a40935ae4d7b11d4097a0324335"},{url:"/static/images/avatar.webp",revision:"312b54997c4686fd06a7d92159db07b0"},{url:"/static/images/avatar_small.webp",revision:"a63f0a7c1d3e3af4d0e4d690fbd9521d"},{url:"/static/images/bg.svg",revision:"82c8a33c2cf24d40f84fc46c422b611d"},{url:"/static/images/blogs/global-module.png",revision:"89c517f0e2c7e61c442660b94f7d220c"},{url:"/static/images/blogs/module-in-nestjs.png",revision:"ee2d6a4b87a99321561e83f83d7ec7fc"},{url:"/static/images/blogs/shared-module.png",revision:"852c7040f655895db63874bd0ebaeeaa"},{url:"/static/images/not-found.svg",revision:"a53025e687459da4cd18533ac4dd5b4e"},{url:"/static/images/screenshot.png",revision:"0e9241c36f5f8d2e65be661a1a76d297"},{url:"/static/images/suraj-blog.webp",revision:"53f879b1bbddf39a47bf3b244e882c0b"},{url:"/static/images/user-chat.jpg",revision:"2d4e84e0bf1607591cb91e1cd4585e4e"},{url:"/static/images/user.png",revision:"4e25e801c38eecf2a52c6369b477b6d8"},{url:"/static/sounds/message.mp3",revision:"00eb3785d3e85fa1127c22279f672207"},{url:"/static/sounds/open.mp3",revision:"5c52e23b38733ed6ddea61f9475c6c76"},{url:"/static/sounds/page-change.mp3",revision:"091709e7e474beb326cb9f67c15beb48"},{url:"/static/sounds/switch-on.mp3",revision:"74a6ecab29936556e36f7cd48f0dc12d"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/tags/application/feed.xml",revision:"f7ec54a4d346835c18dbef4779586de9"},{url:"/tags/applicationdsd/feed.xml",revision:"33fc92a36b287e9330633564b4b16e2f"},{url:"/tags/book/feed.xml",revision:"fca52360b64c662538f5e5e6d6af8334"},{url:"/tags/canada/feed.xml",revision:"61f66f8d425782108a860a2019e1bfd9"},{url:"/tags/code/feed.xml",revision:"28dec2f9d155f49c6c1e6631b3528edb"},{url:"/tags/danger/feed.xml",revision:"58e3eac7943bc40d112dfd7df94d3e2e"},{url:"/tags/design-patterns/feed.xml",revision:"cdc2b7393f22e39972355005ef2b6f8d"},{url:"/tags/dsd/feed.xml",revision:"d59a0af5e4bb08fcbc98ecdb33dc833a"},{url:"/tags/dsdxcx/feed.xml",revision:"789ab1ebf7fccc3bbf4e2dc687d87599"},{url:"/tags/feature/feed.xml",revision:"24249795ada386f380ded2bdcd52a0a7"},{url:"/tags/features/feed.xml",revision:"05197920c8a6f553560d82806542ecfa"},{url:"/tags/github/feed.xml",revision:"c58a236023eda4ebcda022515ce7541f"},{url:"/tags/guide/feed.xml",revision:"e035b41368e799d1d069a08a0785b7f7"},{url:"/tags/holiday/feed.xml",revision:"2e35c7d4ea956ffd5279b0ed46e88ba5"},{url:"/tags/images/feed.xml",revision:"e51f58adcfefc97787bd94e81baedcf5"},{url:"/tags/javascript/feed.xml",revision:"458c06160d43540ebcfa59e8edd32fc6"},{url:"/tags/markdown/feed.xml",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/tags/math/feed.xml",revision:"9f973ee2baf49720c282dcad20b2dd25"},{url:"/tags/multi-author/feed.xml",revision:"9dc8f3ad323f61444afbaec8049122ff"},{url:"/tags/nestjs/feed.xml",revision:"efacb5c983bf19ffebf440514c66d7ef"},{url:"/tags/next-js/feed.xml",revision:"85bb8cbadc4c5560aca0a14854a9c22c"},{url:"/tags/ols/feed.xml",revision:"17df301da1ae76fe40b3ace4f88776a9"},{url:"/tags/react/feed.xml",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/tags/reflection/feed.xml",revision:"0a7f3ce9c4f2eb8824cac85115b59c05"},{url:"/tags/spotify/feed.xml",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/tags/tailwind/feed.xml",revision:"cc02c33163d85c774a7f6b03b1752cc0"},{url:"/tags/typescript/feed.xml",revision:"a21e90ffa0017dd62fee30f380d4eb7b"},{url:"/tags/writings/feed.xml",revision:"c929084b8ea3e483895b851463d00952"},{url:"/twemoji-cache/arm-flex.svg",revision:"1837c5719a977362642ffaf4990b6bac"},{url:"/twemoji-cache/beer.svg",revision:"5e2ea03aa4963cda5e91d395c2587e6b"},{url:"/twemoji-cache/case.svg",revision:"7d4bf2e92b2587e47b09997dbc654823"},{url:"/twemoji-cache/cross.svg",revision:"8becd37ab9d13cdfe37c08c496a9def3"},{url:"/twemoji-cache/dog.svg",revision:"2eb6ca0fe3f48e16b1fe240735710094"},{url:"/twemoji-cache/eye.svg",revision:"ece6283544a703f158b497507aae3b62"},{url:"/twemoji-cache/fire.svg",revision:"67069a13e006345ce28ecc581f2ed162"},{url:"/twemoji-cache/keyboard.svg",revision:"094aec29c55873f2b7a24df523b428c6"},{url:"/twemoji-cache/money-fly.svg",revision:"aff6d39f4947f22f042e67ac21a9dc7a"},{url:"/twemoji-cache/movie.svg",revision:"733a0db94b390b2fd5da87408285a079"},{url:"/twemoji-cache/nepal.svg",revision:"47cd7f001f25667541850514d6b528f7"},{url:"/twemoji-cache/popular-post.svg",revision:"8cd77280fc37422a25059d2d6dd59797"},{url:"/twemoji-cache/popular-tags.svg",revision:"748ff0e7b2f1f22adecad8463de25945"},{url:"/twemoji-cache/sunrise.svg",revision:"c873a3842e3c1c351f71a8e316da3836"},{url:"/twemoji-cache/tools.svg",revision:"28a6206f93399999d1a908d5c45232ad"},{url:"/twemoji-cache/wave.svg",revision:"df7ba0f4020ca70048a0226d1dfa73f6"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute("/",new e.CacheFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
