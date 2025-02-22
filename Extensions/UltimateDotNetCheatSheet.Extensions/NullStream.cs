namespace UltimateDotNetCheatSheet.Extensions;

public class NullStream : Stream
{
    private long _maxLength;

    public NullStream(long maxLength = long.MaxValue)
    {
        _maxLength = maxLength;
    }

    public override bool CanRead => true;

    public override bool CanSeek => true;

    public override bool CanWrite => true;

    public override long Length => _maxLength;

    public override long Position { get; set; }

    public override void Flush()
    {
        //What is written is ignored to the void
    }

    public override int Read(byte[] buffer, int offset, int count)
    {
        for (int i = offset; i < count; i++)
        {
            buffer[i] = 0;
        }
        Position += (count - offset);
        return count - offset;
    }

    public override long Seek(long offset, SeekOrigin origin)
    {
        switch (origin)
        {
            case SeekOrigin.Begin:
                Position = offset;
                break;
            case SeekOrigin.Current:
                Position += offset;
                break;
            case SeekOrigin.End:
                Position = Length - offset;
                break;
        }
        return Position;
    }

    public override void SetLength(long value)
    {
        _maxLength = value;
    }

    public override void Write(byte[] buffer, int offset, int count)
    {
        //What is written is ignored to the void
    }
}
