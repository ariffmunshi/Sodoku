import supabase from '@/utils/supabaseDB';

export const GET = async (): Promise<Response> => {
    try {
        const { data: puzzle } = await supabase
            .from('random_sodoku_puzzles')
            .select('puzzle')
            .limit(1)
            .single();
        return new Response(JSON.stringify(puzzle), {
            status: 200,
            headers: {
                'content-type': 'application/json',
                'cache-control': 'no-store',
            },
        });
    } catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 });
    }
};
