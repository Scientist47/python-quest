# Draws the Python Quest app icon (snake logo on blue) at every size Android needs.
import sys, os
from PIL import Image, ImageDraw
BLUE=(46,105,176); WHITE=(255,255,255); YELLOW=(255,201,40); NAVY=(22,32,51)
def bez(p0,p1,p2,p3,n=80):
    return [tuple((1-t)**3*a+3*(1-t)**2*t*b+3*(1-t)*t*t*c+t**3*d for a,b,c,d in zip(p0,p1,p2,p3)) for t in [i/n for i in range(n+1)]]
PATH = bez((8,30),(8,24),(14,24),(20,24))+bez((20,24),(26,24),(32,24),(32,18))+bez((32,18),(32,12),(26,12),(22,12))
def draw_logo(size, scale, bg):
    S=4; W=size*S
    im=Image.new("RGBA",(W,W),BLUE+(255,) if bg else (0,0,0,0)); d=ImageDraw.Draw(im)
    k=W*scale/40; off=W*(1-scale)/2  # 40-unit logo box, centred
    cx,cy=20,21  # visual centre of the drawing
    tx=lambda x,y:(off+(x-cx+20)*k, off+(y-cy+20)*k)
    r=3*k
    for x,y in PATH:
        X,Y=tx(x,y); d.ellipse([X-r,Y-r,X+r,Y+r],fill=WHITE)
    X,Y=tx(22,12); R=5.5*k; d.ellipse([X-R,Y-R,X+R,Y+R],fill=YELLOW)
    X,Y=tx(23.5,10.8); R=1.3*k; d.ellipse([X-R,Y-R,X+R,Y+R],fill=NAVY)
    return im.resize((size,size),Image.LANCZOS)
def rounded(im, radius_frac):
    m=Image.new("L",im.size,0); ImageDraw.Draw(m).rounded_rectangle([0,0,im.size[0]-1,im.size[1]-1],int(im.size[0]*radius_frac),fill=255)
    out=Image.new("RGBA",im.size,(0,0,0,0)); out.paste(im,(0,0),m); return out
def circle(im):
    m=Image.new("L",im.size,0); ImageDraw.Draw(m).ellipse([0,0,im.size[0]-1,im.size[1]-1],fill=255)
    out=Image.new("RGBA",im.size,(0,0,0,0)); out.paste(im,(0,0),m); return out
root=sys.argv[1]
draw_logo(512,0.86,True).save(os.path.join(root,"assets/icon-512.png"))
res=os.path.join(root,"android/app/src/main/res")
if os.path.isdir(res):
    for dens,legacy,fg in [("mdpi",48,108),("hdpi",72,162),("xhdpi",96,216),("xxhdpi",144,324),("xxxhdpi",192,432)]:
        d=os.path.join(res,"mipmap-"+dens); os.makedirs(d,exist_ok=True)
        rounded(draw_logo(legacy,0.82,True),0.18).save(os.path.join(d,"ic_launcher.png"))
        circle(draw_logo(legacy,0.78,True)).save(os.path.join(d,"ic_launcher_round.png"))
        draw_logo(fg,0.52,False).save(os.path.join(d,"ic_launcher_foreground.png"))  # adaptive icon: art inside the 66/108 safe zone
    # splash images: blue with the logo in the middle
    for name in os.listdir(res):
        p=os.path.join(res,name,"splash.png")
        if name.startswith("drawable") and os.path.exists(p):
            w,h=Image.open(p).size; im=Image.new("RGBA",(w,h),BLUE+(255,)); s=int(min(w,h)*0.35)
            logo=draw_logo(s,0.9,False); im.paste(logo,((w-s)//2,(h-s)//2),logo); im.save(p)
    print("android icons + splash written")
print("assets/icon-512.png written")
