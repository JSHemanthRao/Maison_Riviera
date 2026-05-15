$downloads = @{
    "billionaire-6.webp" = "https://www.datocms-assets.com/99008/1713813058-billionaire-dual-toourbillon_internals_v09-b.webp"
    "epic-sf24-5.webp" = "https://www.datocms-assets.com/99008/1698264032-es101-20-ns-yb-a.webp"
    "epic-sf24-6.webp" = "https://www.datocms-assets.com/99008/1698265605-es101-21-ns-yk-a.webp"
    "oil-pump-4.webp" = "https://www.datocms-assets.com/99008/1687515519-jacob-co-oil-pump-rose-gold-jcam33-side.png"
    "oil-pump-5.webp" = "https://www.datocms-assets.com/99008/1687515525-jacob-co-oil-pump-rose-gold-jcam33-lifestyle.jpg"
    "oil-pump-6.webp" = "https://www.datocms-assets.com/99008/1777998973-oi110-21-aa-aa-abala.webp"
    "astronomia-solar-4.webp" = "https://www.datocms-assets.com/99008/1697491814-at100-30-ac-sd-c.webp"
    "astronomia-solar-5.webp" = "https://www.datocms-assets.com/99008/1697491927-at120-40-ad-sd-a.webp"
    "astronomia-solar-6.webp" = "https://www.datocms-assets.com/99008/1711638202-as310-21-as-aa-a.webp"
    "fleurs-de-jardin-4.webp" = "https://www.datocms-assets.com/99008/1736539018-fleur_de_jardin_rainbow_cobra_af321-40-bd-ae-b.webp"
    "fleurs-de-jardin-5.webp" = "https://www.datocms-assets.com/99008/1697490254-af321-30-bc-aa-bbsaa.webp"
    "fleurs-de-jardin-6.webp" = "https://www.datocms-assets.com/99008/1711638402-af321-40-aa-aa-a.webp"
    "caviar-tourbillon-4.webp" = "https://www.datocms-assets.com/99008/1703256912-3-billionaire-inspo.webp"
    "caviar-tourbillon-5.webp" = "https://www.datocms-assets.com/99008/1713813068-billionaire-dual-toourbillon_internals_v09-f.webp"
    "caviar-tourbillon-6.webp" = "https://www.datocms-assets.com/99008/1711638602-cv110-40-aa-aa-a.webp"
    "astronomia-art-india-3.webp" = "https://www.datocms-assets.com/99008/1687515320-jacob-co-astronomia-art-india-details.png"
    "gotham-city-2.webp" = "https://www.datocms-assets.com/99008/1687515434-jacob-co-gotham-city-rose-gold-back.png"
    "gotham-city-3.webp" = "https://www.datocms-assets.com/99008/1687515439-jacob-co-gotham-city-rose-gold-side.png"
    "gotham-city-4.webp" = "https://www.datocms-assets.com/99008/1687515445-jacob-co-gotham-city-rose-gold-lifestyle.jpg"
    "gotham-city-5.webp" = "https://www.datocms-assets.com/99008/1687515420-jacob-co-gotham-city-black-titanium-front.png"
    "gotham-city-6.webp" = "https://www.datocms-assets.com/99008/1687515424-jacob-co-gotham-city-black-titanium-back.png"
    "brilliant-skeleton-2.webp" = "https://www.datocms-assets.com/99008/1687515354-jacob-co-brilliant-skeleton-rose-gold-side.png"
    "astronomia-clarity-dragon-hero.webp" = "https://images.jacobandco.com/products/astronomia-solar-icy-blue-baguette-sapphires.webp"
    "astronomia-clarity-dragon-2.webp" = "https://www.datocms-assets.com/99008/1711638224-as310-21-as-aa-a_2.webp"
    "astronomia-clarity-dragon-3.webp" = "https://www.datocms-assets.com/99008/1711638235-as310-21-as-aa-a_3.webp"
}

foreach ($key in $downloads.Keys) {
    $url = $downloads[$key]
    $dest = "c:\Sharvex\JacobandCo2\public\images\watches\$key"
    if (!(Test-Path $dest)) {
        Write-Host "Downloading $key..."
        try {
            Invoke-WebRequest -Uri $url -OutFile $dest -ErrorAction Stop
        } catch {
            Write-Host "Failed to download $key"
        }
    }
}

