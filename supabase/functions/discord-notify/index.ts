import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { username, level, bounty, build, division, reason } = await req.json();

    const token = Deno.env.get("DISCORD_BOT_TOKEN");
    const channelId = "1518199338151444571";

    if (!token) {
      throw new Error("Discord bot token not configured");
    }

    const embed = {
      title: "New Crew Application",
      color: 0x0ea5e9,
      fields: [
        { name: "Username", value: username || "N/A", inline: true },
        { name: "Level", value: level || "N/A", inline: true },
        { name: "Bounty", value: bounty || "N/A", inline: true },
        { name: "Build", value: build || "N/A", inline: true },
        { name: "Division", value: division || "N/A", inline: true },
        { name: "Why should we accept them?", value: reason || "N/A", inline: false },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Shadow Tide Crew Application",
      },
    };

    const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bot ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Discord API error: ${response.status} ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
