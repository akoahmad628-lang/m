import {NextResponse} from 'next/server';
import {db} from '../../../lib/supabase';
import {validApt} from '../../../lib/data';
export async function POST(req){
 const body=await req.json();
 const {match_id,name,phone,apartment_code,home_score,away_score}=body;
 if(!match_id||!name||!phone||!apartment_code||home_score===''||away_score==='') return NextResponse.json({error:'fill'},{status:400});
 if(!validApt(apartment_code)) return NextResponse.json({error:'badApt'},{status:400});
 const supa=db();
 if(!supa)return NextResponse.json({ok:true,demo:true});
 const {data:match}=await supa.from('matches').select('*').eq('id',match_id).single();
 if(!match)return NextResponse.json({error:'Match not found'},{status:404});
 if(new Date()>new Date(match.close_at))return NextResponse.json({error:'closed'},{status:400});
 const {data:dup}=await supa.from('predictions').select('id').eq('match_id',match_id).or(`phone.eq.${phone},apartment_code.eq.${apartment_code}`).limit(1);
 if(dup?.length)return NextResponse.json({error:'duplicate'},{status:409});
 const {error}=await supa.from('predictions').insert({match_id,name,phone,apartment_code,home_score:Number(home_score),away_score:Number(away_score)});
 if(error)return NextResponse.json({error:error.message.includes('duplicate')?'duplicate':error.message},{status:500});
 return NextResponse.json({ok:true});
}
