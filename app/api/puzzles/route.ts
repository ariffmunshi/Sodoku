import supabase from '@/utils/supabaseDB';

export const GET = async (): Promise<Response> => {
    try {
        const { data: puzzle } = await supabase
            .from('random_sodoku_puzzles')
            .select('puzzle')
            .limit(1)
            .single();
        const headers = new Headers();
        headers.set('Cache-Control', 'no-store');
        return new Response(JSON.stringify(puzzle), {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 });
    }
};
