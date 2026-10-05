from PIL import Image
import os

img = Image.open("ChatGPT Image Sep 25, 2026, 09_59_07 PM.png")
w, h = img.size

# Directory
os.makedirs("public/images", exist_ok=True)

# 1. Hero Knee (Right side of hero)
# Box: left, upper, right, lower
hero_knee = img.crop((460, 0, 1024, 250))
hero_knee.save("public/images/knee-hero.png")

# 2. Dr. Manu Bora portrait
dr_portrait = img.crop((165, 290, 440, 525))
dr_portrait.save("public/images/dr-manu-bora.jpg")

# 3. Knee Anatomy Central (Section 3)
knee_anatomy = img.crop((380, 535, 650, 790))
knee_anatomy.save("public/images/knee-anatomy.png")

# 4. Cartilage 5 Layers (Section 4)
c1 = img.crop((330, 825, 450, 960))
c1.save("public/images/cartilage-layer-01.png")

c2 = img.crop((465, 825, 580, 960))
c2.save("public/images/cartilage-layer-02.png")

c3 = img.crop((595, 825, 710, 960))
c3.save("public/images/cartilage-layer-03.png")

c4 = img.crop((720, 825, 835, 960))
c4.save("public/images/cartilage-layer-04.png")

c5 = img.crop((845, 825, 960, 960))
c5.save("public/images/load-distribution.png")

# 5. Clinical approach 6 circles
circles = [
    (350, 1045, 428, 1123, "scan.png"),
    (465, 1045, 543, 1123, "understand.png"),
    (575, 1045, 655, 1123, "target.png"),
    (688, 1045, 768, 1123, "rehabilitate.png"),
    (798, 1045, 878, 1123, "strengthen.png"),
    (908, 1045, 988, 1123, "followup.png"),
]

for left, upper, right, lower, filename in circles:
    crop_img = img.crop((left, upper, right, lower))
    crop_img.save(f"public/images/{filename}")

print("Assets cropped successfully!")
