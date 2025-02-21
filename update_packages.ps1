$files = Get-ChildItem -Path ".\packages\*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace "Package Inclusions:" with "Your stay includes:"
    $content = $content -replace '<h3>Package Inclusions:</h3>', '<h3>Your stay includes:</h3>'
    
    # Replace list group with package inclusions
    $content = $content -replace '<ul class="list-group list-group-flush mb-4">', '<div class="package-inclusions"><ul>'
    $content = $content -replace '</ul>', '</ul></div>'
    
    # Add checkmarks to list items
    $content = $content -replace '<li class="list-group-item">(.*?)</li>', '<li><i class="fas fa-check"></i> $1</li>'
    
    # Update hotel information icons
    $content = $content -replace 'Room Category:', '<i class="fas fa-bed text-muted me-2"></i>Room Category:'
    $content = $content -replace 'Meal Plan:', '<i class="fas fa-utensils text-muted me-2"></i>Meal Plan:'
    
    # Save the changes
    $content | Set-Content $file.FullName -Force
}
