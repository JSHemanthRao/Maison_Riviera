$watches = @(
    "astronomia", "bugatti-chiron", "casino-tourbillon", "epic-x", 
    "twin-turbo", "billionaire", "opera-godfather", "oil-pump", 
    "gotham-city", "astronomia-solar", "epic-sf24", "fleurs-de-jardin", 
    "caviar-tourbillon", "astronomia-art-india", "brilliant-skeleton", 
    "astronomia-clarity-dragon"
)

$dir = "c:\Sharvex\JacobandCo2\public\images\watches"

# Initial fallbacks for missing heroes
if (!(Test-Path "$dir\astronomia-clarity-dragon-hero.webp")) {
    Copy-Item "c:\Sharvex\JacobandCo2\public\images\Astronomia Solar Icy Blue Baguette Sapphires.jpg" "$dir\astronomia-clarity-dragon-hero.webp"
}
if (!(Test-Path "$dir\astronomia-art-india-hero.webp")) {
    Copy-Item "c:\Sharvex\JacobandCo2\public\images\Astronomia Art India.jpg" "$dir\astronomia-art-india-hero.webp"
}
if (!(Test-Path "$dir\brilliant-skeleton-hero.webp")) {
    Copy-Item "c:\Sharvex\JacobandCo2\public\images\Brilliant Skeleton.jpg" "$dir\brilliant-skeleton-hero.webp"
}

foreach ($w in $watches) {
    $hero = "$dir\$w-hero.webp"
    for ($i = 2; $i -le 6; $i++) {
        $target = "$dir\$w-$i.webp"
        if (!(Test-Path $target)) {
            # try to find the previous one
            $prev = if ($i -eq 2) { $hero } else { "$dir\$w-$($i-1).webp" }
            if (Test-Path $prev) {
                Copy-Item $prev $target
            }
        }
    }
}

