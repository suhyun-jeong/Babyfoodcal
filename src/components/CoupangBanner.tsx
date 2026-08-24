const BANNER_HTML = `<!DOCTYPE html>
<html>
<head><style>body{margin:0;display:flex;justify-content:center;align-items:center;}</style></head>
<body>
<script src="https://ads-partners.coupang.com/g.js"><\/script>
<script>new PartnersCoupang.G({"id":1021489,"template":"banner","trackingCode":"AF2623204","width":"320","height":"100"});<\/script>
</body>
</html>`

export default function CoupangBanner() {
  return (
    <div className="flex justify-center w-full py-2">
      <iframe
        srcDoc={BANNER_HTML}
        width={320}
        height={100}
        scrolling="no"
        frameBorder={0}
        style={{ border: 'none', display: 'block' }}
      />
    </div>
  )
}
