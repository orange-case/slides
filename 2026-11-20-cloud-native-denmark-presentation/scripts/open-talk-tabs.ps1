# Open the talk's browser tabs in slide order, left to right, in the default browser.
#
#   .\scripts\open-talk-tabs.ps1            # deck from the local dev server (live panels)
#   .\scripts\open-talk-tabs.ps1 -Pages     # deck from GitHub Pages (screenshots only)
#
# Start the deck first (`npm run dev`, port 3030) unless you use -Pages. The Pi must answer
# at $PiHost on the venue network. Opening a tab never changes a flag.
param(
    [switch]$Pages,
    [string]$PiHost = "192.168.8.2",
    [int]$DeckPort = 3030
)

$deck = if ($Pages) {
    "https://orange-case.github.io/slides/2026-11-20-cloud-native-denmark-presentation/"
} else {
    "http://localhost:$DeckPort/"
}
$pi = "http://$PiHost"

# In the order the talk uses them.
$tabs = @(
    @{ When = "whole talk: the deck (audience view)";                          Url = $deck },
    @{ When = "games 1-3: dashboard, click the Agent tab (Decisions)";        Url = "$pi/" },
    @{ When = "games 1-3: Grafana talk board";                                Url = "$pi/grafana/d/talk?kiosk" },
    @{ When = "after games 1 and 2: one trace per game, summary at its end";  Url = "$pi/jaeger/search?service=agent&operation=agent.game.summary&lookback=1h&limit=5" },
    @{ When = "games 2 and 3: Flagsmith, open the stage environment";         Url = "https://app.flagsmith.com/project/54238" },
    @{ When = "backup / Q&A: Grafana flags (OpenFeature evaluations)";        Url = "$pi/grafana/d/feature-flags" },
    @{ When = "backup / Q&A: Grafana agent decisions and interventions";      Url = "$pi/grafana/d/agent-operations" }
)

if (-not $Pages) {
    # Presenter view as the second tab. GitHub Pages has no SPA fallback, so /presenter/ is a 404
    # there: with -Pages, open presenter mode from the deck's toolbar instead.
    $tabs = @($tabs[0], @{ When = "whole talk: presenter view (notes, timer, time check)"; Url = "$($deck)presenter/" }) + $tabs[1..($tabs.Count - 1)]
} else {
    Write-Host "Pages: open presenter mode from the deck's toolbar (the /presenter/ link is a 404 on Pages)."
}

$i = 0
foreach ($t in $tabs) {
    $i++
    Write-Host ("{0}. {1}`n   {2}" -f $i, $t.When, $t.Url)
    Start-Process $t.Url
    Start-Sleep -Milliseconds 700   # keeps the tabs in this order
}
