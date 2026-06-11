import {NextResponse} from 'next/server';
import {db} from '../../../lib/supabase';
import {defaultMatches,socialLinks} from '../../../lib/data';
export async function GET(){
 const supa=db();
 if(!supa){return NextResponse.json({matches:defaultMatches,predictions:[],winnerHistory:[],socials:socialLinks,demo:true})}
 const [{data:matches,error:e1},{data:predictions,error:e2},{data:winners,error:e3}]=await Promise.all([
  supa.from('matches').select('*').order('kickoff',{ascending:true}),
  supa.from('predictions').select('*').order('created_at',{ascending:false}),
  supa.from('winner_history').select('*').order('created_at',{ascending:false})
 ]);
 if(e1||e2||e3)return NextResponse.json({error:e1?.message||e2?.message||e3?.message},{status:500});
 return NextResponse.json({matches:matches?.length?matches:defaultMatches,predictions:predictions||[],winnerHistory:winners||[],socials:socialLinks});
}
