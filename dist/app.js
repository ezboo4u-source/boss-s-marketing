const channels = {
  map: { name:'지도·플레이스', desc:'네이버·카카오·구글 지도에서 영업 정보와 후기를 관리합니다.', action:'영업시간·메뉴·사진을 최신화하고, 단골 3명에게 솔직한 리뷰를 부탁하세요.' },
  placeAd: { name:'플레이스 광고', desc:'가게 주변에서 검색하는 고객에게 노출되는 지역 기반 광고입니다.', action:'대표 검색어 3개와 반경을 좁게 잡아 소액으로 7일간 시험하세요.' },
  localAd: { name:'지역 타깃 광고', desc:'인스타그램·당근 등에서 생활권 안의 잠재 고객에게 알립니다.', action:'주력 상품 하나와 방문 혜택 하나로 동네 반경 광고를 만드세요.' },
  blog: { name:'블로그', desc:'고객이 비교·검색할 때 전문성과 신뢰를 쌓는 장기 채널입니다.', action:'고객이 가장 자주 묻는 질문 하나를 제목으로 첫 글을 작성하세요.' },
  keyword: { name:'키워드 광고', desc:'지역과 무관하게 구매 의도가 담긴 검색어를 선점합니다.', action:'서비스명+문제 상황 키워드 5개만 골라 전환을 측정하세요.' },
  instagram: { name:'인스타그램', desc:'사진과 짧은 영상으로 공간·상품의 매력을 빠르게 전달합니다.', action:'대표 상품, 만드는 과정, 이용 장면을 각각 한 장씩 촬영하세요.' },
  youtube: { name:'유튜브', desc:'설명과 시연이 중요한 상품을 영상으로 깊이 있게 설득합니다.', action:'고객 질문 하나에 60초로 답하는 세로 영상을 촬영하세요.' },
  threads: { name:'스레드', desc:'사장님의 관점과 현장 이야기를 짧은 글로 꾸준히 알립니다.', action:'오늘 있었던 고객 질문과 답을 5문장 안으로 적어보세요.' },
  openchat: { name:'오픈채팅방', desc:'정보의 속도와 신뢰가 중요한 고객을 폐쇄형 커뮤니티로 모읍니다.', action:'방의 대상, 제공 정보, 금지 규칙을 한 문장씩 정해 개설하세요.' },
  message: { name:'고객 메시지 발송', desc:'동의한 고객에게 재입고·가격·예약 소식을 반복적으로 전달합니다.', action:'고객 동의 여부를 확인하고, 꼭 필요한 소식 한 종류부터 정하세요.' },
  dm: { name:'우편 DM', desc:'주소가 확보된 명확한 고객군에게 인쇄물을 직접 전달합니다.', action:'상위 고객 30명을 추려 한 가지 제안과 연락 방법만 담아 보내세요.' },
  homepage: { name:'간편 홈페이지', desc:'여러 채널의 정보와 문의 동선을 한곳에 모으는 기본 거점입니다.', action:'소개·가격·사례·문의 네 구역만 있는 한 페이지를 만드세요.' }
};

const questions = [
  { id:'type', title:'어떤 방식으로 고객을 만나나요?', help:'가장 가까운 것을 하나 골라주세요.', options:[
    ['visit','고객이 매장으로 방문해요','음식점, 미용실, 학원, 소매점'],['onsite','제가 고객이 있는 곳으로 가요','설치, 수리, 청소, 출장 서비스'],['remote','지역과 상관없이 판매해요','온라인 판매, 전문 서비스, 컨설팅'],['b2b','주로 다른 사업자와 거래해요','도매, 납품, 기업 대상 서비스'] ]},
  { id:'discovery', title:'고객은 보통 어떻게 가게를 찾나요?', help:'실제 신규 고객에게 가장 자주 듣는 경로를 골라주세요.', options:[
    ['map','지도에서 가까운 곳을 찾아요','“근처 ○○” 검색과 리뷰'],['search','검색해서 꼼꼼히 비교해요','네이버·구글 검색, 블로그'],['visual','사진이나 영상에 끌려요','인스타그램, 숏폼, 유튜브'],['referral','소개와 입소문이 중요해요','단골 추천, 커뮤니티'] ]},
  { id:'content', title:'상품을 보여줄 때 무엇이 가장 설득력 있나요?', help:'고객의 구매 결정을 가장 잘 돕는 형식을 생각해보세요.', options:[
    ['photo','사진','음식, 공간, 시술 결과, 제품 디자인'],['explain','자세한 글과 설명','전문성, 비교 정보, 해결 과정'],['video','직접 보여주는 영상','사용법, 변화 과정, 강의'],['update','빠르고 반복적인 소식','가격, 재고, 일정, 새 정보'] ]},
  { id:'data', title:'이미 확보한 고객 정보가 있나요?', help:'광고보다 기존 고객 관리가 더 효율적일 수도 있습니다.', options:[
    ['none','거의 없어요','새 고객을 먼저 모아야 해요'],['contact','전화번호나 채팅 연결이 있어요','수신 동의 고객에게 연락 가능'],['address','우편 주소가 있어요','사업자 명부, 회원 주소 등'],['community','관심 고객 모임이 있어요','단톡방, 카페, 기존 커뮤니티'] ]},
  { id:'frequency', title:'소식은 얼마나 자주 바뀌나요?', help:'가격·재고·예약·새로운 정보의 변화 주기를 기준으로 답해주세요.', options:[
    ['rare','거의 바뀌지 않아요','월 1회 이하'],['weekly','매주 알릴 내용이 있어요','메뉴, 작품, 일정, 사례'],['daily','거의 매일 바뀌어요','시세, 재고, 예약, 속보성 정보'],['seasonal','특정 시기에 집중돼요','시즌, 행사, 모집 기간'] ]},
  { id:'resource', title:'마케팅에 쓸 수 있는 시간은 어느 정도인가요?', help:'무리 없이 3개월간 이어갈 수 있는 기준으로 골라주세요.', options:[
    ['low','주 1시간 이하','관리할 채널을 최소화하고 싶어요'],['medium','주 2~3시간','사진·짧은 글은 가능해요'],['high','주 4시간 이상','글이나 영상을 꾸준히 만들 수 있어요'],['outsourced','비용을 써서 맡길 수 있어요','제작이나 광고 운영 외주 가능'] ]},
  { id:'goal', title:'지금 가장 급한 목표는 무엇인가요?', help:'이번 달에 하나만 좋아져야 한다면 무엇인가요?', options:[
    ['new','신규 고객 늘리기','처음 보는 고객에게 발견되기'],['repeat','재방문과 재구매','기존 고객을 다시 부르기'],['trust','전문성과 신뢰 쌓기','비교 단계에서 선택받기'],['launch','새 상품·행사 알리기','짧은 기간 빠르게 확산하기'] ]}
];

let step=0; const answers={};
const $=s=>document.querySelector(s); const intro=$('#intro'),quiz=$('#quiz'),result=$('#result');
function show(panel){[intro,quiz,result].forEach(x=>x.classList.remove('active'));panel.classList.add('active');window.scrollTo({top:0,behavior:'smooth'})}
function render(){const q=questions[step];$('#stepLabel').textContent=`${step+1} / ${questions.length}`;$('#questionTitle').textContent=q.title;$('#questionHelp').textContent=q.help;$('#progressBar').style.width=`${(step+1)/questions.length*100}%`;$('#options').innerHTML=q.options.map(o=>`<button class="option ${answers[q.id]===o[0]?'selected':''}" data-value="${o[0]}" type="button"><strong>${o[1]}</strong><small>${o[2]}</small></button>`).join('');$('#prevBtn').style.visibility=step?'visible':'hidden';$('#nextBtn').disabled=!answers[q.id];$('#nextBtn').innerHTML=step===questions.length-1?'결과 보기 <span>→</span>':'다음 <span>→</span>';document.querySelectorAll('.option').forEach(b=>b.onclick=()=>{answers[q.id]=b.dataset.value;render()})}
$('.start-btn').onclick=()=>{show(quiz);render()};
$('#prevBtn').onclick=()=>{if(step){step--;render()}};
$('#nextBtn').onclick=()=>{if(!answers[questions[step].id])return;if(step<questions.length-1){step++;render()}else buildResult()};
function reset(){step=0;Object.keys(answers).forEach(k=>delete answers[k]);show(intro)} $('#resetTop').onclick=reset;$('#restartBtn').onclick=reset;

function score(){const s=Object.fromEntries(Object.keys(channels).map(k=>[k,0]));const add=(ks,n)=>ks.forEach(k=>s[k]+=n);
  add(['map','homepage'],1);
  if(answers.type==='visit')add(['map','placeAd','localAd'],5); if(answers.type==='onsite')add(['map','keyword','blog'],4); if(answers.type==='remote')add(['keyword','blog','homepage'],5); if(answers.type==='b2b')add(['dm','message','blog','homepage'],4);
  if(answers.discovery==='map')add(['map','placeAd','localAd'],6); if(answers.discovery==='search')add(['blog','keyword','homepage'],6); if(answers.discovery==='visual')add(['instagram','youtube','localAd'],6); if(answers.discovery==='referral')add(['openchat','threads','message'],5);
  if(answers.content==='photo')add(['instagram','map','localAd'],5); if(answers.content==='explain')add(['blog','keyword','homepage'],5); if(answers.content==='video')add(['youtube','instagram'],6); if(answers.content==='update')add(['message','openchat','threads'],6);
  if(answers.data==='contact')add(['message','openchat'],7); if(answers.data==='address')add(['dm','message'],7); if(answers.data==='community')add(['openchat','message','threads'],7); if(answers.data==='none')add(['map','blog','instagram','keyword'],2);
  if(answers.frequency==='daily')add(['message','openchat','threads'],5); if(answers.frequency==='weekly')add(['instagram','blog','threads'],3); if(answers.frequency==='seasonal')add(['localAd','keyword','message'],4);
  if(answers.resource==='low'){add(['map','homepage','message'],3);s.youtube-=4;s.blog-=2} if(answers.resource==='medium')add(['instagram','threads','blog'],2); if(answers.resource==='high')add(['youtube','blog','instagram'],4); if(answers.resource==='outsourced')add(['keyword','placeAd','localAd'],4);
  if(answers.goal==='new')add(['map','keyword','placeAd','localAd'],5); if(answers.goal==='repeat')add(['message','openchat','dm'],6); if(answers.goal==='trust')add(['blog','youtube','homepage'],5); if(answers.goal==='launch')add(['instagram','localAd','message','threads'],5);
  return Object.entries(s).sort((a,b)=>b[1]-a[1]).slice(0,3);
}
function reason(key){const bits=[];if(['map','placeAd','localAd'].includes(key)&&answers.type==='visit')bits.push('방문 고객 중심');if(['blog','keyword','homepage'].includes(key)&&answers.discovery==='search')bits.push('검색 비교가 중요');if(['instagram','youtube'].includes(key)&&['photo','video'].includes(answers.content))bits.push('시각 자료가 강점');if(['message','openchat','dm'].includes(key)&&answers.data!=='none')bits.push('보유 고객 정보 활용 가능');if(answers.resource==='low'&&['map','homepage','message'].includes(key))bits.push('적은 관리 시간');return bits.length?bits.join(' · '):'현재 목표와 고객 발견 경로에 적합'}
function buildResult(){const top=score();const labels={visit:'방문형',onsite:'출장형',remote:'광역·온라인형',b2b:'사업자 대상'};$('#summary').innerHTML=`<strong>${labels[answers.type]} 사업에 맞춘 결론:</strong> ${channels[top[0][0]].name}을 먼저 완성하고, ${channels[top[1][0]].name}과 ${channels[top[2][0]].name}을 연결해 고객의 발견부터 문의까지 한 흐름으로 만드세요.`;$('#recommendations').innerHTML=top.map(([k],i)=>`<article class="rec-card"><div class="rank">0${i+1}</div><span class="badge">${i?'보조 채널':'핵심 채널'}</span><h3>${channels[k].name}</h3><p>${channels[k].desc}</p><div class="reason"><strong>추천 이유</strong><br>${reason(k)}</div></article>`).join('');$('#roadmapItems').innerHTML=top.map(([k],i)=>`<div class="road-item"><b>${i===0?'오늘':i===1?'3일 안에':'이번 주 안에'}</b><p>${channels[k].action}</p></div>`).join('');show(result)}
$('.print-btn').onclick=()=>window.print();$('#copyBtn').onclick=async()=>{const names=score().map(([k])=>channels[k].name).join(' → ');const text=`우리 가게 마케팅 추천: ${names}`;try{await navigator.clipboard.writeText(text);$('#copyBtn').textContent='복사했어요 ✓';setTimeout(()=>$('#copyBtn').textContent='결과 복사하기',1800)}catch{alert(text)}};

// 같은 진단 기능을 지원 브라우저의 AI 에이전트에서도 사용할 수 있게 노출합니다.
if (document.modelContext?.registerTool) {
  const allowed = Object.fromEntries(questions.map(q => [q.id, q.options.map(o => o[0])]));
  document.modelContext.registerTool({
    name: 'complete_marketing_diagnosis',
    title: '맞춤 마케팅 진단 완료',
    description: '7개 답변을 한 번에 적용하고 화면에 상위 3개 마케팅 채널과 실행 순서를 표시합니다.',
    inputSchema: {
      type: 'object',
      properties: Object.fromEntries(questions.map(q => [q.id, { type:'string', enum:allowed[q.id] }])),
      required: questions.map(q => q.id),
      additionalProperties: false
    },
    annotations: { readOnlyHint:false, untrustedContentHint:false },
    execute(input) {
      for (const q of questions) {
        if (!allowed[q.id].includes(input?.[q.id])) throw new Error(`${q.id} 답변이 올바르지 않습니다.`);
        answers[q.id] = input[q.id];
      }
      buildResult();
      return { recommendations: score().map(([key]) => channels[key].name) };
    }
  });
}
