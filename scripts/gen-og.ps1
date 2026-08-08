Add-Type -AssemblyName System.Drawing

$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'AntiAliasGridFit'

# 背景：深绿青 (dark teal)
$bg = [System.Drawing.Color]::FromArgb(255, 12, 28, 34)
$g.FillRectangle((New-Object System.Drawing.SolidBrush $bg), 0, 0, $w, $h)

# 棋盘：在右侧约 720-1140, 90-510 区域，8×8 网格（视觉简化）
$boardX = 720
$boardY = 90
$boardW = 420
$boardH = 420
$boardColor = [System.Drawing.Color]::FromArgb(255, 32, 36, 40)
$g.FillRectangle((New-Object System.Drawing.SolidBrush $boardColor), $boardX, $boardY, $boardW, $boardH)
$gridPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 120, 130, 138)), 1
$gridPen.Alignment = 'Center'
$lines = 8
for ($i = 0; $i -le $lines; $i++) {
  $offset = $boardX + ($boardW / $lines) * $i
  $g.DrawLine($gridPen, $offset, $boardY, $offset, $boardY + $boardH)
  $g.DrawLine($gridPen, $boardX, $boardY + ($boardH / $lines) * $i, $boardX + $boardW, $boardY + ($boardH / $lines) * $i)
}
$gridPen.Dispose()

# 星位点（中心 4 个）
$starPen = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 120, 130, 138))
foreach ($gx in @(3, 5)) {
  foreach ($gy in @(3, 5)) {
    $cx = $boardX + ($boardW / $lines) * $gx
    $cy = $boardY + ($boardH / $lines) * $gy
    $g.FillEllipse($starPen, $cx - 2, $cy - 2, 4, 4)
  }
}
$starPen.Dispose()

# 棋子：一黑一白
$stoneSize = 36
$white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$black = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::Black)
$g.FillEllipse($black, ($boardX + ($boardW / $lines) * 3) - $stoneSize / 2, ($boardY + ($boardH / $lines) * 4) - $stoneSize / 2, $stoneSize, $stoneSize)
$g.FillEllipse($white, ($boardX + ($boardW / $lines) * 5) - $stoneSize / 2, ($boardY + ($boardH / $lines) * 4) - $stoneSize / 2, $stoneSize, $stoneSize)
$white.Dispose(); $black.Dispose()

# 左侧文字
$accentColor = [System.Drawing.Color]::FromArgb(255, 232, 200, 140)  # warm gold
$textWhite = [System.Drawing.Color]::FromArgb(255, 240, 240, 240)
$textDim = [System.Drawing.Color]::FromArgb(255, 150, 160, 168)

# 弈界 漢字（尝试常见 Windows 中文字体）
$hanziFont = $null
foreach ($name in 'Microsoft YaHei UI','Microsoft YaHei','SimHei','PingFang SC','Yu Gothic','MS Gothic') {
  try {
    $f = New-Object System.Drawing.Font($name, 80, [System.Drawing.FontStyle]::Bold)
    $hanziFont = $f
    break
  } catch {}
}
if ($hanziFont) {
  $hanziBrush = New-Object System.Drawing.SolidBrush $accentColor
  $g.DrawString('弈界', $hanziFont, $hanziBrush, 60, 110)
  $hanziFont.Dispose(); $hanziBrush.Dispose()
}

# YiBoard 标题（品牌名）
$titleFont = New-Object System.Drawing.Font('Segoe UI', 96, [System.Drawing.FontStyle]::Bold)
$titleBrush = New-Object System.Drawing.SolidBrush $textWhite
$g.DrawString('YiBoard', $titleFont, $titleBrush, 56, 220)
$titleFont.Dispose(); $titleBrush.Dispose()

# Slogan
$sloganFont = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Regular)
$sloganBrush = New-Object System.Drawing.SolidBrush $textDim
$g.DrawString('Gomoku today. Xiangqi and Go next.', $sloganFont, $sloganBrush, 60, 360)
$sloganFont.Dispose(); $sloganBrush.Dispose()

# 副标语
$subFont = New-Object System.Drawing.Font('Segoe UI', 18, [System.Drawing.FontStyle]::Regular)
$subBrush = New-Object System.Drawing.SolidBrush $accentColor
$g.DrawString('yiboardgame.com', $subFont, $subBrush, 60, 470)
$subFont.Dispose(); $subBrush.Dispose()

# 小徽标：no-account-required
$badgeFont = New-Object System.Drawing.Font('Segoe UI', 16, [System.Drawing.FontStyle]::Regular)
$badgeBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 110, 120, 128))
$g.DrawString('Free  ·  No account  ·  Five languages', $badgeFont, $badgeBrush, 60, 555)
$badgeFont.Dispose(); $badgeBrush.Dispose()

$g.Dispose()
$bmp.Save('C:\Users\Administrator\WorkBuddy\2026-08-07-14-54-00\yiboard\public\og.png', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "og.png written"